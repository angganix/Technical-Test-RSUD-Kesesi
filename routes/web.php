<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\CarRentalController;
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

Route::group(["middleware" => ["auth","verified"]], function () {
    Route::group(["prefix" => "dashboard"], function () {
        Route::get("/", function () {
            return Inertia::render('Dashboard');
        })->name("dashboard");
    });
    Route::group(["prefix" => "car"], function () {
        Route::get("/", [CarController::class, "index"])->name("car");
    });
    Route::group(["prefix" => "rent"], function () {
        Route::get("/", [CarRentalController::class, "index"])->name("rent");
    });
    Route::group(["prefix" => "profile"], function () {
        Route::get("/", [ProfileController::class, "edit"])->name("profile.edit");
        Route::patch("/", [ProfileController::class, "update"])->name("profile.update");
        Route::delete("/", [ProfileController::class, "destroy"])->name("profile.destroy");
    });
});

require __DIR__.'/auth.php';
