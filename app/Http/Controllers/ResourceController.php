<?php

namespace App\Http\Controllers;

use App\Account;
use App\Resource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResourceController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return "hmmm";
        return view('resource.resource');
    }

    /**
     * Get the users account resource data
     */
    public function get(Request $request, $ac_id) {
        if(Auth::user()) {
            $resources = Resource::where('ac_id', '=', $ac_id)->get();
            // dd($accounts);
            return $resources;
        } else {
            return [1000=>2];
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
        $res = Resource::firstOrNew(['ac_id'=>$ac_id]);
        $res->user_id = Auth::user()->id;
        $res->data = json_encode($data);
        $res->save();
        return $ac_id;
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function show(Resource $resource)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function edit(Resource $resource)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Resource $resource)
    {
        //
        return "updating in res controller";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Resource  $resource
     * @return \Illuminate\Http\Response
     */
    public function destroy(Resource $resource)
    {
        //
    }

    public function getAll() {
        if(Auth::check()) {
        
            $r = User::select('*')
                ->join('resources', 'users.id', '=', 'resources.user_id')
                ->join('accounts', 'resources.ac_id', '=', 'accounts.id')
                ->where('users.id', '=', Auth::user()->id)
                ->orderBy('ac_id')
                ->get();

            return $r;
        }
    }
}
