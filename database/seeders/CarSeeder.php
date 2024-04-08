<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "name"          => "86",
                "merk"          => "Toyota",
                "model"         => "FT 86",
                "plat_number"   => "B 4232 DI",
                "daily_cost"    => 100000
            ],
            [
                "name"          => "Agya",
                "merk"          => "Toyota",
                "model"         => "TRD A/T",
                "plat_number"   => "B 3343 GI",
                "daily_cost"    => 125000
            ],
            [
                "name"          => "Alphard",
                "merk"          => "Toyota",
                "model"         => "MPV Boxy",
                "plat_number"   => "B 1234 JA",
                "daily_cost"    => 200000
            ],
            [
                "name"          => "Eclipse Cross",
                "merk"          => "Mitsubishi",
                "model"         => "Red Diamond",
                "plat_number"   => "B 4321 HI",
                "daily_cost"    => 150000
            ]
        ];
        
        foreach ($data as $item) {
            Car::create([
                "name"          => $item["name"],
                "merk"          => $item["merk"],
                "model"         => $item["model"],
                "plat_number"   => $item["plat_number"],
                "daily_cost"    => $item["daily_cost"]
            ]);
        }
    }
}
