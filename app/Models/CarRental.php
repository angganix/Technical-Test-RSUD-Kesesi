<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarRental extends Model
{
    use HasFactory;

    protected $table = "car_rentals";
    protected $guarded = [];

    public function car()
    {
        return $this->belongsTo(Car::class, "car_id", "id");
    }

    public function customer()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
