<?php

namespace App\Http\Controllers;
use GuzzleHttp\Client;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\UsedFeature;
use Illuminate\Http\Request;

class CalculatorController extends Controller
{
    public ?Feature $feature = null;

    public function __construct(Request $request)
    {
        $user = $request->user();
        $this->feature = Feature::where("route_name", "healthCalculator.index")
            ->where('active', true)
            ->firstOrFail();              
    }
    

    public function index()
    {
        return inertia('HealthCalculator/bmiIndex', [
            'feature' => new FeatureResource($this->feature),
            'answer' => session('answer'),
            'lowWeight' =>session('weightLow'),
            'highWeight' =>session('weightHigh'),

        ]);
        
    }

    public function bmiCalculate(Request $request)
    {
        $user = $request->user();
        if ($user->available_duration <= 0){
            return back();
        }
        $data = $request->validate([
            'weight' => ['required', 'numeric', 'gt:0'],
            'height' => ['required', 'numeric', 'gt:0.5'],
        ]);

        $weight = (float) $data['weight'];
        $height = (float) $data['height'];


                
        $client = new Client();
        $response = $client->request('POST', 'https://bmi-calculator-api.p.rapidapi.com/', [
            'headers' => [
                'Content-Type' => 'application/json',
                'X-Rapidapi-Key' => '3d0b1df596msh84ed7a22c5b945ep1a5875jsnd51486d230c5',
                'Host'=> 'bmi-calculator-api.p.rapidapi.com',
            ],
            'json' => [
                'weight' => $weight,
                'height' => $height,
            ],
        ]);

        $body = $response->getBody();
        $data = json_decode($body, true);
        

        UsedFeature::create([
            'feature_id' => $this->feature->id,
            'user_id' =>$user->id,
            'subscribed_plan' => $this->feature->required_plan,
            'data' => $data,            
        ]);

         $healthy_weightLow = 18.5 * ($height*$height);
         $healthy_weightHigh = 24.5 * ($height*$height);

         $healthy_weightLow = number_format((float)$healthy_weightLow, 0, '.', '');
         $healthy_weightHigh = number_format((float)$healthy_weightHigh, 0, '.', '');


        return to_route('healthCalculator.index')->with([
            'answer' => $data,
            'weight' => $weight,
            'weightLow' => $healthy_weightLow,
            'weightHigh' => $healthy_weightHigh,

        ]);  
    }

}
