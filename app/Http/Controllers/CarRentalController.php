<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\CarRental;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarRentalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $data = CarRental::with(["car", "customer"])
        ->when($user->access == "customer", function ($query) use ($user) {
            $query->where("user_id", $user->id);
        })
            ->orderBy("id", "desc")
            ->get();
        return Inertia::render("Rent/List", [
            "data" => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Car $car)
    {
        return Inertia::render("Rent/Form", [
            "car"       => $car
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $user   = $request->user();
        $car_id = $request->car_id;
        $request->validate([
            "start_rent"    => "required",
            "end_rent"      => "required",
        ]);

        CarRental::create([
            "start_rent"    => $request->start_rent,
            "end_rent"      => $request->end_rent,
            "car_id"        => $car_id,
            "user_id"       => $user->id
        ]);

        Car::where("id", $car_id)->update([
            "availability"  => false
        ]);

        return redirect(route('rent'));
    }

    /**
     * Display the specified resource.
     */
    public function show(CarRental $carRental)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CarRental $carRental)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CarRental $carRental)
    {
        //
    }

    public function returnCar(CarRental $carRental): RedirectResponse
    {
        $carRental->return_time = date("Y-m-d H:i:s");
        $carRental->save();

        Car::where("id", $carRental->car_id)->update([
            "availability"  => true
        ]);

        return redirect(route("rent"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarRental $carRental)
    {
        //
    }
}
