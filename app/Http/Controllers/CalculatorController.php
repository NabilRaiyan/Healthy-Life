<?php

namespace App\Http\Controllers;
require 'vendor/autoload.php';
use GuzzleHttp\Client;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\UsedFeature;
use Illuminate\Http\Request;

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
        return inertia('HealthCalculator/Index', [
            'feature' => new FeatureResource($this->feature),
            'answer' => session('answer') ?? [],
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

        UsedFeature::create([
            'feature_id' => $this->feature->id,
            'user_id' =>$user->id,
            'subscribed_plan' => $this->feature->subscribed_plan,
            'data' => $data,            
        ]);

        $postData = [
            'weight' => $weight,
            'height' => $height,
        ];


        $client = new Client();
        $response = $client->request('POST', 'https://bmi-calculator-api.p.rapidapi.com/', [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => '1c1849698dmsh4ead14c76df84eep1bcf08jsnb8940baf8414',
            ],
            'form_params' => $postData,
        ]);

        $body = $response->getBody();
        $data = json_decode($body, true);
        print_r($data);

        return to_route('healthCalculator.index')->with('answer', $data);
    }

}
