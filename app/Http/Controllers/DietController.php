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
            'prompt' => session('prompt'),
            
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
                'prompt' => ['required'],
                
            ]);

            $prompt = (float) $data['prompt'];
    

            UsedFeature::create([
                'feature_id' => $this->feature->id,
                'user_id' => $user->id,
                'subscribed_plan' => $this->feature->required_plan,
                'data' => $data,
            ]);

            return to_route('personalDiet.index')->with([
                'prompt' => $prompt,
               
            ]);
        }

        catch(Exception $e){
            return back()->withErrors(['error' => 'An error occurred while fetching data: ' . $e->getMessage()]);
        }
    }
}
