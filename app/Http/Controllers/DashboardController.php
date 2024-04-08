<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
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
        return Inertia::render("Dashboard", [
            "cars" => $cars,
            "search" => $search,
            "merk" => $merk,
            "model" => $model,
            "availability" => $availability,
            "master_data" => $this->getMasterField()
        ]);
    }
}
