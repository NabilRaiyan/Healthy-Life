<?php

namespace App\Http\Controllers;
use App\Http\Resources\FeatureResource;
use App\Http\Resources\PackageResource;
use App\Models\Feature;
use App\Models\Package;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;



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

        try{
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_webhook
            );
        }catch(\UnexpectedValueException $e){
            return response('', 400);

        }catch(\Stripe\Exception\SignatureVerificationException $e){
            return response('', 400);
        }

        switch ($event->type){
            case 'checkout.session.completed':
                $session = $event->data->object;

                $transaction = Transaction::where('session_id', $session->id)->first();
                if ($transaction && $transaction->status === 'pending'){
                    $transaction->status = 'paid';
                    $transaction->save();
                    $transaction->user->available_duration += 
                    $transaction->duration_months;
                    $transaction->user->save();

                }
        }


        return response('');
    }
}
