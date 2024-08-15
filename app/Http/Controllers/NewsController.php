<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\UsedFeature;
use Error;
use Exception;
use Illuminate\Http\Request;
use GuzzleHttp\Client;


class NewsController extends Controller
{

    public ?Feature $feature = null;


    public function __construct()
    {
        $this->feature = Feature::where('route_name', 'health.newsIndex')
            ->where('active', true)
            ->firstOrFail();
    }

    public function Index()
    {
        return inertia('News/newsIndex', [
            'feature' => new FeatureResource($this->feature),
            'answer' => session('answer'),
        ]);

    }
    public function getNews(Request $request)
    {    

        $user = $request->user();
        if ($user->available_duration <= 0){
            return back();
        }
        // Validate the 'limit' field
        $data = $request->validate([
            'limit' => ['required', 'numeric'], // Specify the 'limit' field and its validation rules
        ]);

        // Convert the 'limit' value to an integer
        $limit = (int) $data['limit'];


        $client = new Client();
        $response = $client->request('GET', 'https://real-time-news-data.p.rapidapi.com/search',[
            'headers' => [
                'Content-Type' => 'application/json',
                'X-Rapidapi-Key' => '30e80c0d1amsh37cb263e05361d7p1fd42fjsn888d68ad4d69',
                'Host'=> 'real-time-news-data.p.rapidapi.com',
            ],
            'query' => [
                'query' => 'Mens Fitness and Diet',
                'limit' => $limit,
                'time_published' => 'anytime',
                'country' => 'US',
                'lang' => 'en',
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

        return to_route('health.newsIndex')->with([
            'answer' => $data,
        ]);  


    }
}
