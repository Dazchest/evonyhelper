<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BuildingsAccount extends Model
{
    protected $fillable = [
        'user_id', 'ac_id', 'data'
    ];
}
