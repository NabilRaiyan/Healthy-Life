<?php

namespace App\Http\Controllers;
use App\Http\Resources\FeatureResource;
use App\Http\Resources\PackageResource;
use App\Models\Feature;
use App\Models\Package;
use App\Models\Transaction;
use App\Models\User;
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

    public function webhook()
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
        Log::error('Invalid payload');
        return response('', 400);
    } catch (\Stripe\Exception\SignatureVerificationException $e) {
        Log::error('Invalid signature');
        return response('', 400);
    }

    Log::info('Webhook received', ['event_type' => $event->type]);

    switch ($event->type) {
        case 'checkout.session.completed':
            Log::info('Processing checkout.session.completed event');
            $session = $event->data->object;

            $transaction = Transaction::where('session_id', $session->id)->first();
            if (!$transaction) {
                Log::error('Transaction not found', ['session_id' => $session->id]);
                return response('Transaction not found', 404);
            }

            Log::info('Transaction found', ['transaction_id' => $transaction->id]);

            if ($transaction->status === 'pending') {
                Log::info('Updating transaction status to paid');
                $transaction->status = 'paid';
                $transaction->save();

                $user = $transaction->user;
                if (!$user) {
                    Log::error('User not found', ['user_id' => $transaction->user_id]);
                    return response('User not found', 404);
                }

                Log::info('User found', ['user_id' => $user->id]);

                $package = $transaction->package;
                if (!$package) {
                    Log::error('Package not found', ['package_id' => $transaction->package_id]);
                    return response('Package not found', 404);
                }

                Log::info('Package found', ['package_name' => $package->name]);

                // Update the user's subscribed plan and available duration
                $user->subscribed_plan = $package->name;
                $user->available_duration += ceil($package->duration_days / 30); // Convert days to months if needed
                $user->save();

            Log::info('User updated successfully', [
                    'user_id' => $user->id,
                    'subscribed_plan' => $user->subscribed_plan,
                    'available_duration' => $user->available_duration
                ]);
            } else {
                Log::info('Transaction already processed', ['status' => $transaction->status]);
            }
            break;

        default:
            Log::info('Unhandled event type', ['event_type' => $event->type]);
            break;
    }

    return response('');
}

    

}
