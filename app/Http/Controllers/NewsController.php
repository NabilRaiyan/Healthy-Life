<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\UsedFeature;
use Error;
use Exception;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

// news controller
class NewsController extends Controller
{

    public ?Feature $feature = null;

    // constructor
    public function __construct()
    {
        $this->feature = Feature::where('route_name', 'health.newsIndex')
            ->where('active', true)
            ->firstOrFail();
    }

    //index function
    public function Index()
    {
        return inertia('News/newsIndex', [
            'feature' => new FeatureResource($this->feature),
            'answer' => session('answer'),
        ]);

    }

    // get news articles form news api
    public function getNews(Request $request)
    {    
        try {
            $user = $request->user();
            if ($user->available_duration <= 0){
                return back();
            }
            // Validate the 'limit' field
            $data = $request->validate([
                'limit' => ['required', 'numeric'], 
            ]);
        
            // Convert the 'limit' value to an integer
            $limit = (int) $data['limit'];
        
            $client = new Client();
            $response = $client->request('GET', 'https://newsapi.org/v2/everything', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'X-Api-Key' => env('NEWS_API_KEY'),
                ],
                'query' => [
                    'q' => 'Fitness and Diet',
                    'pageSize' => $limit,
                ],
            ]);

            
            $body = $response->getBody();
            $data = json_decode($body, true);
        
            // creating used features and add them into the table
            UsedFeature::create([
                'feature_id' => $this->feature->id,
                'user_id' => $user->id,
                'subscribed_plan' => $this->feature->required_plan,
                'data' => $data,
            ]);
        
            return to_route('health.newsIndex')->with([
                'answer' => $data,
            ]);
        
        } catch (Exception $e) {
            // Handle the exception
            return back()->withErrors(['error' => 'An error occurred while fetching the news: ' . $e->getMessage()]);
        }
        
    }
}
