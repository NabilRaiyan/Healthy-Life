<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Http\Resources\PackageResource;
use App\Models\Feature;
use App\Models\Package;
use Illuminate\Http\Request;

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

    }

    public function success(){

    }

    public function cancel(){

    }

    public function webhook()
    {

    }
}
