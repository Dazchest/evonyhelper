<?php

namespace App\Http\Controllers;

use App\Building;
use App\BuildingsAccount;
use App\Imports\SheetsImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToArray;
use Maatwebsite\Excel\Facades\Excel;

use function GuzzleHttp\json_decode;

class BuildingController extends Controller
{

    public $table = ["name"=>"walls"];
    public $buildings = [
        "Keep", "Walls", "Academy", "Rally Spot", "Barracks", "Archer Camp", "Stables",
        "Workshop", "Hospital", "Embassy", "Market Place", "Warehouse", "Tavern", "Shrine", 
        "Archer Tower",
        "Forge", "Trap Factory", "War Hall", "Watchtower", "Art Hall", "Arsenal", "Pasture",
        "Research Factory ", "Prison", "Holy Palace",
        "Farm", "Sawmill", "Quarry", "Mine", "Army Camp",
        ];


    public function initData() {
        $type = 1;
        Building::truncate();
        foreach ($this->buildings as $building => $name) {
            // dd($name);
            for ($x=1; $x<36; $x++) {
                if($name == "Arsenal" && $x>1) {    // Only 1 level for a Arsenal
                    break;
                }
                $build = new Building();
                $build->type = $type;
                $build->name = $name;
                $build->level = $x;
                $build->requiredBuilding = json_encode([]);

                if($name == "Keep" && $x>1) {   // Set the walls level as keep level-1
                    $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x-1],["type"=>"2", "level"=> $x-1]]);
                }
                if($name != "Keep") {           // Set the Keep level as current build level
                    if($x>1) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1], ["type"=>"1", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x]]);
                    }
                }
                if($name == "Embassy") {   // Set the walls level as keep level-1
                    if($x>1) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"11", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x],["type"=>"11", "level"=> $x]]);
                    }
                }
                if($name == "Rally Spot" && $x>25) {   // Set the walls level as keep level-1
                    $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"30", "level"=> $x]]);
                }
                if($name == "Barracks" && $x>25) {   // Set the walls level as keep level-1
                    $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"26", "level"=> $x]]);
                }
                if($name == "Archer Camp" && $x>25) {   // Set the walls level as keep level-1
                    $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"27", "level"=> $x]]);
                }
                if($name == "Stables" && $x>25) {   // Set the walls level as keep level-1
                    $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"29", "level"=> $x]]);
                }
                if($name == "Workshop") {   // Set the walls level as keep level-1
                    if($x>1) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"27", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x],["type"=>"27", "level"=> $x]]);
                    }
                }
                if($name == "Tavern") {
                    if($x>1 && $x<4) {  
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> 3]]);
                    } else if($x>1) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x],["type"=>"1", "level"=> $x]]);
                    }
                }
                if($name == "Archer Tower") {   // Set the walls level as keep level-1
                    if($x>1) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"2", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x],["type"=>"2", "level"=> $x]]);
                    }
                }
                if($name == "Forge" && $x>25) {   // Set the walls level as keep level-1
                    $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"19", "level"=> $x]]);
                }
                if($name == "Trap Factory") {   // Set the walls level as keep level-1
                    if($x>1) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"27", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x],["type"=>"27", "level"=> $x]]);
                    }
                }
                if($name == "War Hall") {   // Set the walls level as keep level-1
                    if($x>1 && $x<10) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"10", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x],["type"=>"10", "level"=> $x]]);
                    }
                }
                if($name == "Watchtower") {   // Set the walls level as keep level-1
                    if($x>1) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"26", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x],["type"=>"26", "level"=> $x]]);
                    }
                }
                if($name == "Arsenal") {   // Set the walls level as keep level-1
                    $build->requiredBuilding = json_encode([["type"=>"1", "level"=> 27]]);
                }
                if($name == "Pasture") {   // Set the walls level as keep level-1
                    if($x>1) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"12", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x],["type"=>"12", "level"=> $x]]);
                    }
                }
                if($name == "Research Factory") {   // Set the walls level as keep level-1
                    if($x>1) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"9", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x],["type"=>"9", "level"=> $x]]);
                    }
                }
                if($name == "Prison") {   // Set the walls level as keep level-1
                    if($x>1) {
                        $build->requiredBuilding = json_encode([["type"=>$type, "level"=> $x-1],["type"=>"1", "level"=> $x],["type"=>"28", "level"=> $x]]);
                    } else {
                        $build->requiredBuilding = json_encode([["type"=>"1", "level"=> $x],["type"=>"28", "level"=> $x]]);
                    }
                }

                $build->requiredResearch = json_encode([]);
                $build->unlocks = json_encode([]);
                $build->save();
            }
            $type++;
        }
        return "Init data complete";
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function setData()
    {
        $data = Excel::toArray(new SheetsImport, storage_path('app/public/buildings.xlsx'));
        // $data = json_encode($data);
        foreach ($data[0] as $rows => $row) {
            // dd($row);
            $build = Building::firstOrNew(['type'=>$row[1], 'level'=>$row[3]]);
            // dd($build);
            // $build->type = $row[1];
            // $build->name = $row[2];
            // $build->level = $row[3];
            $build->food = $row[4];
            $build->wood = $row[5];
            $build->stone = $row[6];
            $build->iron = $row[7];
            $build->time = $row[8];
            // $build->requiredBuilding = json_encode($row[9]);
            // $build->requiredResearch = json_encode([]);
            $build->temp1 = $row[11];
            $build->temp2 = $row[12];
            // $build->unlocks = json_encode([]);
            $build->save();
        }
        // $data = $request->input('data');
        // $res = Resource::firstOrNew(['ac_id'=>$ac_id]);
        // $res->user_id = Auth::user()->id;
        // $res->data = json_encode($data);
        // $res->save();
        // dd($data[0]);
        // dd($this->table);
        return "yay";   
    }

    public function index() {
        return view('buildings');
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
    public function store(Request $request)
    {
        //
    }

    // Return a blank list of buildings
    public function getBuildings() {
        $build = Building::where('level',1)->orderBy('name')->get()->ToArray();
        foreach ($build as $key => $value) {
            // dd($build[$key]['name']);
            $build[$key]['level'] = 0;        // Reset to level 0
        }
        return json_encode($build);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Building  $building
     * @return \Illuminate\Http\Response
     */
    public $requiredList = [];
    public $requiredList2 = [];
    // public $r = 0;

    public function show($ac_id, $type, $level)
    {
        $this->buildList($ac_id, $type, $level);
        // sort($this->requiredList);
        array_multisort($this->requiredList2);

        $type = array_column($this->requiredList2, 'type');
        $level = array_column($this->requiredList2, 'level');

        // array_multisort($type, SORT_ASC, $this->requiredList2);
        array_multisort($level, SORT_DESC, $this->requiredList2);

        return $this->requiredList2;
    }

    public function buildList($ac_id, $type, $level) {
        $build = Building::where('type', $type)->where('level', $level)->get()->ToArray();
        $build = $build[0];
        // dd($build[0]->name);
        // dd($build[0]);
        // $requireBuilding = json_decode($build[0]->requiredBuilding);
        $requireBuilding = json_decode($build['requiredBuilding']);
        // dd($requireBuilding);

        if($this->getAccountBuildingLevel($ac_id, $type) < $level) {
            $i = in_array($build['id'], $this->requiredList);
            if(!$i) {       // Dont duplicate a build id

                array_push($this->requiredList, $build['id']);
                array_push($this->requiredList2, $build);

                foreach ($requireBuilding as $key => $build) {
                    // if($this->getAccountBuildingLevel($ac_id, $build->type) < $build->level) {
                        $this->buildList($ac_id, $build->type, $build->level);
                    // }
                }
            }
        }

    }

    public function getAccountBuildingLevel($ac_id, $type) {
        $accountBuildings = app('App\Http\Controllers\BuildingsAccountController')->getAccountBuildings($ac_id);
        $ab = json_decode($accountBuildings);
        // $ab = $accountBuildings;
        // dd($ab);
        // $key = array_search(4, array_column($ab, 'type'));
        // dd($key);
        $key = array_search($type, array_column($ab, 'type'));
        // if($type==4) {
        //     dd($key);
        // }
        // return 2;
        return $ab[$key]->level;

        // dd($accountBuildings[0]);
        // if($type == 1) {
        //     return 5;
        // } else {
        //     return 0;
        // }
    }

    // public function getAccountBuildings($ac_id) {
    //     $acBuildings = BuildingsAccount::where('ac_id', $ac_id)->get()->ToArray();
    //     if(count($acBuildings) > 0) {
    //         return $acBuildings;
    //     } else {
    //         return $this->getBuildings();
    //     }
    //     $buildList = [];
    //     foreach ($this->buildings as $key => $value) {
    //         $currentBuild = [];
    //         $currentBuild['name'] = $value;
    //         $currentBuild['level'] = 0;
    //         // $currentBuild['name'] = $value;
    //         array_push($buildList, $currentBuild);
    //     }
    //     return $buildList;
    // }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function editValues($type)
    {
        $building = Building::where('type', $type)->get()->ToArray();
        return $building;

    }
    public function editRequired($type, $level)
    {
        $building = Building::where('type', $type)->where('level', $level)->get()->ToArray();
        if(count($building) > 0) {
            $required = json_decode($building[0]['requiredBuilding']);
            
            $requiredList = [];
            foreach ($required as $key => $value) {
                $type = $value->type;
                $level = $value->level;
                $building = Building::select('type', 'level')->where('type', $type)->where('level', $level)->get()->ToArray();
                array_push($requiredList, $building[0]);
            }
            return $requiredList;
        } else {
            return json_encode([]);
        }
    }

    public function saveRequired(Request $request) {
        $data = $request->input('data');
        $type = $data['type'];
        $level = $data['level'];
        $required = $data['required'];
        $building = Building::where('type', $type)->where('level', $level)->first();
        $building->requiredBuilding = $required;
        $building->save();
        return $building;
    }

    public function getBuildingInfo($type, $level) {
        $building = Building::where('type', $type)->where('level', $level)->get()->ToArray();
        // dd($building[0]);
        if(count($building[0]) > 0) {
            return $building[0];
        } else {
            return ["heelo" => "pack"];
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Building $building)
    {
        $data = $request->input('data');
        // $building = Building::find($data['id']);
        // $building = Building::firstOrNew([$data['id']]);
        $building = Building::firstOrNew(['type'=>$data['type'], 'level'=>$data['level']]);
        $building->type = $data['type'];
        $building->level = $data['level'];
        $building->name = $data['name'];
        $building->food = $data['food'];
        $building->wood = $data['wood'];
        $building->stone = $data['stone'];
        $building->iron = $data['iron'];
        $building->time = $data['time'];
        $building->save();
        return $building;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Building  $building
     * @return \Illuminate\Http\Response
     */
    public function destroy(Building $building)
    {
        //
    }
}
