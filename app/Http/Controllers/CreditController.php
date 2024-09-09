<?php

namespace App\Http\Controllers;
use App\Http\Resources\FeatureResource;
use App\Http\Resources\PackageResource;
use App\Models\Feature;
use App\Models\Package;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

//  credit controller

class CreditController extends Controller
{
    //  index page
    public function index()
    {
        $packages = Package::all();
        $features = Feature::where('active', true)->get();
        return inertia("Credit/CreditIndex", [
            'packages' => PackageResource::collection($packages),
            'features' => FeatureResource::collection($features),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    // buy package page
    public function buyPackage(Package $package)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));
        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' =>[
                            'name' => $package->name . '_' .
                            $package->duration_days . ' days', 
                        ],
                        'unit_amount' => $package->price * 100, 
                    ],
                    'quantity' => 1,
                ]
                ], 
                'mode' => 'payment', 
                'success_url' => route('credit.success', [], true),
                'cancel_url' => route('credit.cancel', [], true),
                ]);

                Transaction::create([
                    'status' => 'pending',
                    'price' =>  $package->price,
                    'duration_months' =>  $package->duration_days,
                    'session_id' =>  $checkout_session->id,
                    'user_id' =>  Auth::id(),
                    'package_id' =>  $package->id,
                ]);

                return redirect($checkout_session->url);

    }

    // success page
    public function success(Package $package)
    {
        return to_route('package.index')->with('success', "You have successfully buy the package " . $package->name);
    }

    public function cancel(Package $package){
        return to_route('package.index')->with('error', "An error have occurred during purchasing " . $package->name);
    }

    public function webhook(Package $package)
    {

    $endpoint_webhook = env('STRIPE_WEBHOOK_KEY');
    $payload = @file_get_contents('php://input');
    $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
    $event = null;

    try {
        $event = \Stripe\Webhook::constructEvent(
            $payload,
            $sig_header,
            $endpoint_webhook
        );
    } catch (\UnexpectedValueException $e) {
        Log::error('Webhook Error: Invalid Payload', ['error' => $e->getMessage()]);
        return response('', 400);
    } catch (\Stripe\Exception\SignatureVerificationException $e) {
        Log::error('Webhook Error: Signature Verification Failed', ['error' => $e->getMessage()]);
        return response('', 400);
    }

    if ($event->type === 'checkout.session.completed') {
        $session = $event->data->object;

        // Find the transaction
        $transaction = Transaction::where('session_id', $session->id)->first();
        
        if ($transaction && $transaction->status === 'pending') {
            // Retrieve the package associated with the transaction
            $package = Package::find($transaction->package_id);

            // Update the transaction
            $transaction->status = 'paid';
            $transaction->save();

            // Update the user
            $user = $transaction->user;
            if ($package) {
                $user->available_duration += ceil($package->duration_days / 30); // Convert days to months
                $user->subscribed_plan = $package->name; // Update to current package's name
                $user->save();

                // Log details
                Log::info('Transaction data', ['transaction' => $transaction]);
                Log::info('User data', ['user' => $user]);
                Log::info('Package data', ['package' => $package]);
            } else {
                Log::error('Package not found', ['package_id' => $transaction->package_id]);
            }
        }
    }

    return response('');
}

}
