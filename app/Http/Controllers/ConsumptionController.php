<?php

namespace App\Http\Controllers;

use App\Consumption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsumptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('consumption');
    }

    public function get($ac_id) {
        if(Auth::user()) {
            $con = Consumption::where('account_id', '=', $ac_id)->get();
            // dd($accounts);
            return $con;
        } else {
            return [];
        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $ac_id)
    {
        $data = $request->input('data');
        $res = Consumption::firstOrNew(['account_id'=>$ac_id]);
        $res->user_id = Auth::user()->id;
        $res->account_id = $ac_id;
        $res->data = json_encode($data);
        $res->save();
        return $ac_id;
        

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Consumption  $consumption
     * @return \Illuminate\Http\Response
     */
    public function show(Consumption $consumption)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Consumption  $consumption
     * @return \Illuminate\Http\Response
     */
    public function edit(Consumption $consumption)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Consumption  $consumption
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Consumption $consumption)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Consumption  $consumption
     * @return \Illuminate\Http\Response
     */
    public function destroy(Consumption $consumption)
    {
        //
    }
}
