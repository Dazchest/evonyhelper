<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Speed extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'ac_id', 'user_id', 'data'
    ];
    //
}
