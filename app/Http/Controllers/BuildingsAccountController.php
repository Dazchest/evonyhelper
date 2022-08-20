<?php

namespace App\Http\Controllers;

use App\BuildingsAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BuildingsAccountController extends Controller
{
        public $buildings = [
        "Keep", "Walls", "Academy", "Rally Spot", "Barracks", "Archer Camp", "Stables",
        "Workshop", "Hospital", "Embassy", "Market Place", "Warehouse", "Tavern", "Shrine", 
        "Archer Tower",
        "Forge", "Trap Factory", "War Hall", "Watchtower", "Art Hall", "Arsenal", "Pasture",
        "ResearchFactory ", "Prison", "Holy Palace",
        "Farm", "Sawmill", "Quarry", "Mine", "Army Camp",
        ];


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

    public function getAccountBuildings($ac_id) {
        $acBuildings = BuildingsAccount::where('ac_id', $ac_id)->get()->ToArray();

        if(count($acBuildings) > 0) {
            return $acBuildings[0]['data'];
        } else {
            return app('App\Http\Controllers\BuildingController')->getBuildings();
        }
        $buildList = [];
        $i = 0;
        foreach ($this->buildings as $key => $value) {
            $currentBuild = [];
            // $currentBuild['id'] = $i;
            // $i++;
            $currentBuild['name'] = $value;
            $currentBuild['level'] = 0;
            array_push($buildList, $currentBuild);
        }
        return $buildList;
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
        $build = BuildingsAccount::firstOrNew(['ac_id'=>$ac_id]);
        $build->user_id = Auth::user()->id;
        $build->ac_id = $ac_id;
        $build->data = json_encode($data);
        $build->save();

        return $ac_id;
    }
    // $res = Consumption::firstOrNew(['account_id'=>$ac_id]);

    /**
     * Display the specified resource.
     *
     * @param  \App\BuildingsAccount  $buildingsAccount
     * @return \Illuminate\Http\Response
     */
    public function show(BuildingsAccount $buildingsAccount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BuildingsAccount  $buildingsAccount
     * @return \Illuminate\Http\Response
     */
    public function edit(BuildingsAccount $buildingsAccount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BuildingsAccount  $buildingsAccount
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BuildingsAccount $buildingsAccount)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BuildingsAccount  $buildingsAccount
     * @return \Illuminate\Http\Response
     */
    public function destroy(BuildingsAccount $buildingsAccount)
    {
        //
    }
}
