<?php

namespace App\Http\Controllers;

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
        ]);
    }

    public function buyPackage(Package $package){

    }

    public function success(){

    }

    public function cancel(){

    }

    public function webhook()
    {

    }
}
