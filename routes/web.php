<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\CarRentalController;
use App\Http\Controllers\DashboardController;
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
        Route::get("/", [DashboardController::class, "index"])->name("dashboard");
    });
    Route::group(["prefix" => "car"], function () {
        Route::get("/", [CarController::class, "index"])->name("car");
        Route::get("/add-new", [CarController::class, "create"])->name("car.add-new");
        Route::get("/edit/{car}", [CarController::class, "edit"])->name("car.edit");
        Route::post("/", [CarController::class, "store"])->name("car.insert");
        Route::post("/update/{car}", [CarController::class, "update"])->name("car.update");
        Route::delete("/{car}", [CarController::class, "destroy"])->name("car.delete");
    });
    Route::group(["prefix" => "rent"], function () {
        Route::get("/{car}", [CarRentalController::class, "create"])->name("rent.create");
        Route::get("/", [CarRentalController::class, "index"])->name("rent");
        Route::post("/", [CarRentalController::class, "store"])->name("rent.store");
        Route::patch("/{carRental}", [CarRentalController::class, "returnCar"])->name("rent.return");
    });
    Route::group(["prefix" => "profile"], function () {
        Route::get("/", [ProfileController::class, "edit"])->name("profile.edit");
        Route::patch("/", [ProfileController::class, "update"])->name("profile.update");
        Route::delete("/", [ProfileController::class, "destroy"])->name("profile.destroy");
    });
});

require __DIR__.'/auth.php';
