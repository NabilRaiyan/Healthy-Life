<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\Request;

class FatCalculatorController extends Controller
{
    public ?Feature $feature = null;
    public function __construct(Request $request)
    {
        $this->feature = Feature::where('route_name', 'healthCalculator.fatIndex')
            ->where('active', true)
            ->firstOrFail();
    }


    public function fatIndex()
    {
        return inertia('HealthCalculator/fatIndex', [
            'feature' => new FeatureResource($this->feature),
            'answer' => session('answer')
        ]);
    }

    public function fatCalculate(Request $request)
    {
        $user = $request->user();
        if ($user->available_duration <= 0){
            return back();
        }
        $data = $request->validate()
    }
}
