<?php

use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\DietController;
use App\Http\Controllers\FatCalculatorController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/buy-package/webhook', [CreditController::class, 'webhook'])->name('credit.webhook');



Route::middleware('auth')->group(function () {
    Route::get('/health-calculator', [CalculatorController::class, 'index'])->name('healthCalculator.index');
    Route::post('/health-calculator', [CalculatorController::class, 'bmiCalculate'])->name('healthCalculator.bmiCalculate');

    Route::get('/health-calculator/fat-calculation', [FatCalculatorController::class, 'fatIndex'])->name('healthCalculator.fatIndex');
    Route::post('/health-calculator/fat-calculation', [FatCalculatorController::class, 'fatCalculate'])->name('healthCalculator.fatCalculate');


    Route::get('/health-news', [NewsController::class, 'Index'])->name('health.newsIndex');
    Route::post('/health-news', [NewsController::class, 'getNews'])->name('health.getNews');

    Route::get('/diet-plan', [DietController::class, 'dietIndex'])->name('personalDiet.index');
    Route::post('/diet-plan', [DietController::class, 'dietPlan'])->name('diet.dietPlan');


    Route::get('/buy-package', [CreditController::class, 'index'])->name('package.index');
    Route::get('/buy-package/success', [CreditController::class, 'success'])->name('credit.success');
    Route::get('/buy-package/cancel', [CreditController::class, 'cancel'])->name('credit.cancel');
    Route::post('/buy-package/{package}', [CreditController::class, 'buyPackage'])->name('credit.buy');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
