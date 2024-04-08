<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "name"                  => "Administrator",
                "email"                 => "admin@example.com",
                "phone"                 => "085951218906",
                "address"               => null,
                "drive_license_number"  => null,
                "email_verified_at"     => date("Y-m-d H:i:s"),
                "access"                => "admin",
                "password"              => Hash::make("admin123")
            ],
            [
                "name"                  => "Angga Pratama",
                "email"                 => "angganix@gmail.com",
                "phone"                 => "083878913848",
                "address"               => "Jl. Rawa Terati No. 128",
                "drive_license_number"  => "4283-23231-5342342",
                "email_verified_at"     => date("Y-m-d H:i:s"),
                "access"                => "customer",
                "password"              => Hash::make("user123")
            ]
        ];

        foreach ($data as $item) {
            User::create([
                "name"                  => $item["name"],
                "email"                 => $item["email"],
                "phone"                 => $item["phone"],
                "address"               => $item["address"],
                "drive_license_number"  => $item["drive_license_number"],
                "email_verified_at"     => $item["email_verified_at"],
                "access"                => $item["access"],
                "password"              => $item["password"]
            ]);
        }
    }
}
