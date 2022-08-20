<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CardComposerController extends Controller
{
    //


    public function index() {
        return view('cardcomposer.cardcomposer');
    }
}
