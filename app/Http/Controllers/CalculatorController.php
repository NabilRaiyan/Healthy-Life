<?php

namespace App\Http\Controllers;
use GuzzleHttp\Client;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\UsedFeature;
use Illuminate\Http\Request;

// require './vendor/autoload.php';

class CalculatorController extends Controller
{


    public ?Feature $feature = null;

    public function __construct()
    {
        $this->feature = Feature::where("route_name", "healthCalculator.index")
            ->where('active', true)
            ->firstOrFail();
    }

    public function index()
    {
        return inertia('HealthCalculator/bmiIndex', [
            'feature' => new FeatureResource($this->feature),
            'answer' => session('answer'),
        ]);
    }

    public function bmiCalculate(Request $request)
    {
        $user = $request->user();
        if ($user->available_duration <= 0){
            return back();
        }
        $data = $request->validate([
            'weight' => ['required', 'numeric'],
            'height' => ['required', 'numeric'],
        ]);

        $weight = (float) $data['weight'];
        $height = (float) $data['height'];

        echo $weight;
        echo $height;

        
        $client = new Client();
        $response = $client->request('POST', 'https://bmi-calculator-api.p.rapidapi.com/', [
            'headers' => [
                'Content-Type' => 'application/json',
                'X-Rapidapi-Key' => '1c1849698dmsh4ead14c76df84eep1bcf08jsnb8940baf8414',
                'Host'=> 'bmi-calculator-api.p.rapidapi.com',
            ],
            'json' => [
                'weight' => $weight,
                'height' => $height,
            ],
        ]);

        $body = $response->getBody();
        $data = json_decode($body, true);
        print_r($data);

        UsedFeature::create([
            'feature_id' => $this->feature->id,
            'user_id' =>$user->id,
            'subscribed_plan' => $this->feature->required_plan,
            'data' => $data,            
        ]);

        return to_route('healthCalculator.index')->with('answer', $data);
    }

}
