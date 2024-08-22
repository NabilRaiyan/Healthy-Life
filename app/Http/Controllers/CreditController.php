<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Http\Resources\PackageResource;
use App\Models\Feature;
use App\Models\Package;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CreditController extends Controller
{
    public function index()
    {
        $package = Package::all();
        $feature = Feature::where('active', true)->get();
        return inertia("Credit/CreditIndex", [
            'packages' => PackageResource::collection($package),
            'features' => FeatureResource::collection($feature),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

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
                        'unit_amount' => $package->price, 
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

    public function success(Package $package)
    {
        return to_route('credit.index')->with('success', "You have successfully buy the package " . $package->name);
    }

    public function cancel(Package $package){
        return to_route('credit.index')->with('error', "An error have occurred during purchasing " . $package->name);
    }

    public function webhook()
    {

    }
}
