<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
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

    public function accounts() {
        return $this->hasMany('App\Account', 'ac_id');
    }
}
