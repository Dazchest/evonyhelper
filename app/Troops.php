<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Troops extends Model
{
    protected $fillable = [
        'user_id', 'account_id', 'data'
    ];
    //
}
