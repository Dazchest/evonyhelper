<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Sheets;
use App\Imports\SheetsImport;
use App\Troops;
use App\User;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class TroopsController extends Controller
{
    //
    public function convertToJson() {
        $data = Excel::toArray(new SheetsImport, storage_path('app/public/troops.xlsx'));
        // var_dump($data[0]);

        $troops = [];
        $newTroop = [];

        foreach ($data as $troopType) {
            $type = [];
            $index = 0;
            foreach ($troopType as $troop) {
                if($index>0) {
                    $newTroop['type'] = $troop[0];
                    $newTroop['tier'] = $troop[2];
                    $newTroop['food'] =  $troop[3];
                    $newTroop['wood'] = $troop[4];
                    $newTroop['stone'] = $troop[5];
                    $newTroop['iron'] = $troop[6] ? $troop[6] : 0;
                    $newTroop['gold'] = $troop[7];
                    $newTroop['basetime'] = intval($troop[8]);
                    $newTroop['time'] = intval($troop[8]);
                    $newTroop['power'] = $troop[9]  ? intval($troop[9]) : 0;
                    $type[] = $newTroop;
                }
                $index++;
            }
            $troops[] = $type;
        }
        // print "---------------------\n\n\n";
        $dataJson = json_encode($troops);
        print $dataJson;
        // var_dump($dataJson);
        file_put_contents(storage_path('app/public/troops.json'), $dataJson);

    }


    public function index() {
        // $sheets = Sheets::spreadsheet(config('google.post_spreadsheet_id'))->all();
        // print_r($sheets);
        // $sheet
        //  Sheets::spreadsheet(config('google.post_spreadsheet_id'))
        //     ->sheet(config('google.post_spreadsheet_id'))
        //     ->get();

        // $path = 'storage/app\public\buildingtype.xlsx';
        // // $data = Excel::load($path)->get();
        // $data = Excel::import();
        // $data = Excel::import(new SheetsImport, storage_path('app/public/buildingtype.xlsx'));
        
        // $data = Excel::toArray(new SheetsImport, storage_path('app/public/troops.xlsx'));
        // dd($data);
        // $data = json_encode($data);
        return view('troops.troops');
        return view('troops.troops', compact('data'));
    }

    //----------------------
    public function get($ac_id) {
        if(Auth::check()) {
            $data = Troops::where('account_id', $ac_id)->get()->ToArray();
            if($data) {
                return $data[0]['data'];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public function getAll() {
        if(Auth::check()) {
        
            $r = User::select('*')
                ->join('troops', 'users.id', '=', 'troops.user_id')
                ->join('accounts', 'troops.account_id', '=', 'accounts.id')
                ->where('users.id', '=', Auth::user()->id)
                ->orderBy('accounts.id')
                ->get();

            return $r;
        }
    }
    public function store(Request $request, $ac_id) {
        $data = $request->input('data');
        $res = Troops::firstOrNew(['account_id'=>$ac_id]);
        $res->user_id = Auth::user()->id;
        $res->data = json_encode($data);
        $res->save();
        return $ac_id;
    }
}
