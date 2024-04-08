<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Car $car)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Car $car)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        //
    }
}
