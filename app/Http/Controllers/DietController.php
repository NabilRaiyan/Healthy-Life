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

    // diet index page
    public function dietIndex()
    {
        return inertia('Diet/DietPlan', [
            'feature' => new FeatureResource($this->feature),
            'prompt' => session('prompt'),
            'answer' => session('answer'),
            
        ]);
    }

    // adding diet plan controller
    public function dietPlan(Request $request)
    {
        try{
            $user = $request->user();
            if ($user->available_duration <= 0){
                return back();
            }

            $data = $request->validate([
                'prompt' => ['required'],
                
            ]);

            UsedFeature::create([
                'feature_id' => $this->feature->id,
                'user_id' => $user->id,
                'subscribed_plan' => $this->feature->required_plan,
                'data' => $data,
            ]);

            return to_route('personalDiet.index')->with([
                'prompt' => $data['prompt'],
                'answer' => $data,
            ]);
        }

        catch(Exception $e){
            return back()->withErrors(['error' => 'An error occurred while fetching data: ' . $e->getMessage()]);
        }
    }
}
