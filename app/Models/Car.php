<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $table = "cars";
    protected $guarded = [];
    
    public function rent_by()
    {
        return $this->hasOne(CarRental::class, "car_id", "id")->with(["customer"]);
    }
}
