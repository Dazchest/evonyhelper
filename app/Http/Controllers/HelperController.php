<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelperController extends Controller
{
    //

    function index() {
        return view('helpers.helpers');
    }
}
