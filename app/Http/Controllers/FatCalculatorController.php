<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\UsedFeature;
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
            'answer' => session('answer'),
            'weight' => session('weight'),
            'height' => session('height'),
            'age' => session('age'),
            'gender' => session('gender'),

        ]);
    }

    public function fatCalculate(Request $request)
    {
        $user = $request->user();
        if ($user->available_duration <= 0){
            return back();
        }
        $data = $request->validate([
            'weight' => ['required', 'numeric', 'gt:0'],
            'height' => ['required', 'numeric', 'gt:0'],
            'gender' => ['required'],
            'age' => ['required', 'numeric', 'gt:0'],
        ]);

        $age = (float) $data['age'];
        $weight = (float) $data['weight'];
        $height = (float) $data['height'];
        $gender = $data['gender'];

        $bmi = $weight/($height * $height);
        if ($gender === "male"){
            $bfp = 1.20 * $bmi + 0.23 * $age - 16.2;
            $bfp = number_format((float) $bfp, 0, '.', '');
        }
        else if($gender === 'female'){
            $bfp = 1.20 * $bmi + 0.23 * $age - 5.4;
            $bfp = number_format((float) $bfp, 2, '.', '');

        }

        UsedFeature::create([
            'feature_id' => $this->feature->id,
            'user_id' =>$user->id,
            'subscribed_plan' => $this->feature->required_plan,
            'data' => $data,            
        ]);
        return to_route('healthCalculator.fatIndex')->with([
            'answer' => $bfp,
            'weight' => $weight,
            'height' => $height,
            'age' => $age,
            'gender' => $gender,
        ]);

    }
}
