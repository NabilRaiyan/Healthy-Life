<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\Package;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Raiyan',
            'email' => 'raiyan2@gmail.com',
            'password' => bcrypt('123.321Aa'),
        ]);

        Feature::create([
            'image' => 'https://cdn.discordapp.com/attachments/1102451204614783006/1271861901323931699/filename.png?ex=66b8e133&is=66b78fb3&hm=c9ed8a4dc04c86f528bfcfbda4141cabdadeaf17ef6e3ff02ed28f3f6832b65d&',
            'route_name' => 'healthCalculator.index',
            'name' => 'Fitness & Health Calculators',
            'description' => 'Fitness & Health Calculators is a comprehensive tool designed to help you easily assess your health and fitness levels. With features like BMI calculation, body fat analysis, and more, it empowers you to make informed decisions on your wellness journey.',
            'required_plan' => 'basicFit',
            'active' => true,
        ]);
        Feature::create([
            'image' => 'https://cdn.discordapp.com/attachments/1102451204614783006/1271861901323931699/filename.png?ex=66b8e133&is=66b78fb3&hm=c9ed8a4dc04c86f528bfcfbda4141cabdadeaf17ef6e3ff02ed28f3f6832b65d&',
            'route_name' => 'healthCalculator.fatIndex',
            'name' => 'Fitness & Health Calculators',
            'description' => 'Fitness & Health Calculators is a comprehensive tool designed to help you easily assess your health and fitness levels. With features like BMI calculation, body fat analysis, and more, it empowers you to make informed decisions on your wellness journey.',
            'required_plan' => 'basicFit',
            'active' => true,
        ]);

        Feature::create([
            'image' => 'https://cdn.discordapp.com/attachments/1102451204614783006/1271861901323931699/filename.png?ex=66b8e133&is=66b78fb3&hm=c9ed8a4dc04c86f528bfcfbda4141cabdadeaf17ef6e3ff02ed28f3f6832b65d&',
            'route_name' => 'healthCalculator.bmrIndex',
            'name' => 'Fitness & Health Calculators',
            'description' => 'Fitness & Health Calculators is a comprehensive tool designed to help you easily assess your health and fitness levels. With features like BMI calculation, body fat analysis, and more, it empowers you to make informed decisions on your wellness journey.',
            'required_plan' => 'basicFit',
            'active' => true,
        ]);

        Feature::create([
            'image' => 'https://cdn.discordapp.com/attachments/1102451204614783006/1271861901323931699/filename.png?ex=66b8e133&is=66b78fb3&hm=c9ed8a4dc04c86f528bfcfbda4141cabdadeaf17ef6e3ff02ed28f3f6832b65d&',
            'route_name' => 'healthCalculator.calorieIndex',
            'name' => 'Fitness & Health Calculators',
            'description' => 'Fitness & Health Calculators is a comprehensive tool designed to help you easily assess your health and fitness levels. With features like BMI calculation, body fat analysis, and more, it empowers you to make informed decisions on your wellness journey.',
            'required_plan' => 'basicFit',
            'active' => true,
        ]);


        Feature::create([
            'image' => 'https://cdn.discordapp.com/attachments/1102451204614783006/1271863185200386120/filename.png?ex=66b8e265&is=66b790e5&hm=2bf012b795e5ceee92fd764ce0987bdab53b73a4b9e0fb97775a43abbb5fc4ad&',
            'route_name' => 'personalDiet.index',
            'name' => 'Personal Diet',
            'description' => "A personal diet is a customized eating plan tailored to an individual's specific nutritional needs, goals, and preferences. It focuses on achieving optimal health, managing weight, and supporting overall well-being through balanced and mindful food choices.",
            'required_plan' => 'proAthlete',
            'active' => true,
        ]);

        Feature::create([
            'image' => 'https://cdn.discordapp.com/attachments/1102451204614783006/1271863185200386120/filename.png?ex=66b8e265&is=66b790e5&hm=2bf012b795e5ceee92fd764ce0987bdab53b73a4b9e0fb97775a43abbb5fc4ad&',
            'route_name' => 'personalWorkout.index',
            'name' => 'Personal Workout',
            'description' => "A personal workout plan based on BMI and health factors tailors exercises to an individual's body composition, fitness level, and specific health goals. This customized approach ensures effective and safe workouts that align with personal needs, promoting overall well-being and fitness progress.",
            'required_plan' => 'eliteWellness',
            'active' => true,
        ]);

        Feature::create([
            'image' => 'https://cdn.discordapp.com/attachments/1102451204614783006/1271861901323931699/filename.png?ex=66b8e133&is=66b78fb3&hm=c9ed8a4dc04c86f528bfcfbda4141cabdadeaf17ef6e3ff02ed28f3f6832b65d&',
            'route_name' => 'health.newsIndex',
            'name' => 'Fitness & Health News',
            'description' => 'Fitness & Health news is a feature where you can scroll through the news about health and fitness.',
            'required_plan' => 'basicFit',
            'active' => true,
        ]);

        Package::create([
            'name' =>'Basic Fit',
            'price' => 5,
            'description' => 'Basic Fit offers a straightforward and accessible entry into fitness with essential features like BMI calculation and daily workout tips. Ideal for those starting their wellness journey, it provides a solid foundation for tracking progress and staying motivated.',
            'duration_days' => 30,
        ]);

        Package::create([
            'name' =>'Pro Athlete',
            'price' => 10,
            'description' => 'The Pro Athlete package offers a comprehensive fitness experience with personalized workout plans and advanced tracking features. It includes detailed body fat analysis, customized nutrition advice, and access to premium health resources for optimized performance and well-being.',
            'duration_days' => 30,
        ]);

        Package::create([
            'name' =>'Elite Wellness',
            'price' => 15,
            'description' => 'Elite Wellness is a premium fitness package designed to provide a comprehensive wellness experience with advanced features. It includes personalized workout plans, detailed body analysis, access to a virtual personal trainer, and integration with wearable devices for tracking your health journey.',
            'duration_days' => 30,
        ]);

       

    }
}
