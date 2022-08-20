<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function accounts() {
        // return $this->hasManyThrough('App\Resource', 'App\Account', 'id', 'ac_id');
        return $this->hasMany('App\Account');
    }
    
    public function resources() {
        // return $this->hasManyThrough('App\Resource', 'App\Account', 'id', 'ac_id');
        return $this->hasMany('App\Resource');
    }

    
}
