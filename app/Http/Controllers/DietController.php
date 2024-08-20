<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\UsedFeature;
use Exception;
use Illuminate\Http\Request;

class DietController extends Controller
{
    public ?Feature $feature = null;


    public function __construct()
    {
        $this->feature = Feature::where('route_name', "personalDiet.index")
            ->where('active', true)
            ->firstOrFail();
    }

    public function dietIndex()
    {
        return inertia('Diet/DietPlan', [
            'feature' => new FeatureResource($this->feature),
            'weight' => session('weight'),
            'height' => session('height'),
            'age' => session('age'),
            'gender' => session('gender'),
            'goal' => session('goal'),
            'activity_level' => session('activity_level')
        ]);
    }

    public function dietPlan(Request $request)
    {
        try{
            $user = $request->user();
            if ($user->available_duration <= 0){
                return back();
            }

            $data = $request->validate([
                'weight' => ['required', 'numeric'],
                'height' => ['required', 'numeric'],
                'age' => ['required', 'numeric'],
                'gender' => ['required'],
                'goal' => ['required'],
                'activity_level' => ['required']
            ]);

            $weight = (float) $data['weight'];
            $height = (float) $data['height'];
            $age = (float) $data['age'];
            $gender =  $data['gender'];
            $goal =  $data['goal'];
            $activity_level = $data['activity_level'];

            UsedFeature::create([
                'feature_id' => $this->feature->id,
                'user_id' => $user->id,
                'subscribed_plan' => $this->feature->required_plan,
                'data' => $data,
            ]);

            return to_route('personalDiet.index')->with([
                'weight' => $weight,
                'height' => $height,
                'age' => $age,
                'gender' => $gender,
                'goal' => $goal,
                'activity_level' => $activity_level,
            ]);
        }

        catch(Exception $e){

        }
    }
}
