<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CarController extends Controller
{
    private function getMasterField()
    {
        $all_merk = Car::select("merk")->groupBy("merk")->get();
        $all_model = Car::select("model")->groupBy("model")->get();
        return [
            "merk" => $all_merk,
            "model" => $all_model
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search ?? "";
        $limit = $request->limit ?? 24;
        $availability = $request->availability ?? "";
        $merk = $request->merk ?? "";
        $model = $request->model ?? "";

        $cars = Car::when($search != "", function ($query) use ($search) {
            $query->orWhere("name", "like", "%$search%")
                ->orWhere("plat_number", "like", "%$search%");
        })
            ->when($availability != "", function ($query) use ($availability) {
                $query->where("availability", $availability);
            })
            ->when($merk != "", function ($query) use ($merk) {
                $query->where("merk", $merk);
            })
            ->when($model != "", function ($query) use ($model) {
                $query->where("model", $model);
            })
            ->orderBy("id", "desc")
            ->paginate($limit);
        return Inertia::render("Car/List", [
            "cars" => $cars,
            "search" => $search,
            "merk" => $merk,
            "model" => $model,
            "availability" => $availability,
            "master_data" => $this->getMasterField()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Car/Form");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            "name"          => "required",
            "merk"          => "required",
            "model"         => "required",
            "plat_number"   => "required|unique:" . Car::class,
            "daily_cost"    => "required|numeric|min:50000",
        ]);

        $photo = "images/no-car.png";
        if ($request->hasFile("photo")) {
            $photo = $request->file("photo")->storePublicly("images", "public");
        }

        Car::create([
            "name"          => $request->name,
            "merk"          => $request->merk,
            "model"         => $request->model,
            "plat_number"   => $request->plat_number,
            "daily_cost"    => $request->daily_cost,
            "photo"         => $photo
        ]);

        return redirect(route('car'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Car $car)
    {
        return Inertia::render("Car/Form", [
            "data" => $car
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        return Inertia::render("Car/Form", [
            "data" => $car
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Car $car): RedirectResponse
    {
        $request->validate([
            "name"          => "required",
            "merk"          => "required",
            "model"         => "required",
            "plat_number"   => [
                "required",
                Rule::unique("cars")->ignore($car->id)
            ],
            "daily_cost"    => "required|numeric|min:50000",
        ]);

        if ($request->hasFile("photo")) {
            if ($car->photo != "images/no-car.png") {
                Storage::disk("public")->delete($car->photo);
            }
            $car->photo = $request->file("photo")->storePublicly("images", "public");
        }

        $car->name = $request->name;
        $car->merk = $request->merk;
        $car->model = $request->model;
        $car->plat_number = $request->plat_number;
        $car->daily_cost = $request->daily_cost;
        $car->save();

        return redirect(route("car"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car): RedirectResponse
    {
        $old_photo = $car->photo;
        if ($old_photo != "images/no-car.png") {
            Storage::disk("public")->delete($old_photo);
        }
        $car->delete();

        return redirect(route('car'));
    }
}
