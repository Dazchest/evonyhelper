<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'name', 'main',
    ];

    // public function resources() {
    //     return $this->hasOne('App\Resource');
    // }

    //
}
