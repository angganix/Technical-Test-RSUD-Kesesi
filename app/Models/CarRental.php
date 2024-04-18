<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarRental extends Model
{
    use HasFactory;

    protected $table = "car_rentals";
    protected $fillable = ["start_rent", "end_rent", "car_id", "return_time", "user_id"];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function customer()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
