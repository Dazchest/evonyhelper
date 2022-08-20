<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Speed;
use Illuminate\Support\Facades\Auth;

class SpeedController extends Controller
{
    //

    function index() {
        return view('speeds.speeds');
    }

    function store(Request $request, $ac_id) {
        $data = $request->input('data');
        $speed = Speed::firstOrNew(['ac_id' => $ac_id]);
        $speed->user_id = Auth::user()->id;
        $speed->data = json_encode($data);
        $speed->save();
        return "Speed data saved to " . $ac_id;
    }

    function get(Request $request, $ac_id) {
        if(Auth::user()) {
            $speeds = Speed::where('ac_id', '=', $ac_id)->get();
            // dd($accounts);   
            return $speeds;
        } else {
            return [1000=>2];
        }
         
    }
}
