<?php

use App\Consumption;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CardComposerController;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return "hello";
    return view('welcome');
});
// Route::get('/', 'ResourceController@index');

// Route::get('/login', )
Route::get('/cards', 'CardComposerController@index')->name('cards');
Route::get('/helpers', 'HelperController@index')->name("helpers");

Route::get('/account', 'AccountController@index')->name('accounts');
Route::get('/account/get', 'AccountController@get');
Route::get('/account/remove/{id}', 'AccountController@destroy');
Route::get('/account/add/{username}', 'AccountController@store');
Route::get('/account/update/{id}/{username}', 'AccountController@update');

Route::get('/resources2', 'ResourceController@index')->name('resources');
Route::get('/resources/get/{ac_id}', 'ResourceController@get');
Route::get('/resources/getAll', 'ResourceController@getAll');
Route::post('/resources/store/{ac_id}', 'ResourceController@store');

Route::get('/troops', 'TroopsController@index')->name('troops');
Route::get('/troops/get/{ac_id}', 'TroopsController@get');
Route::get('/troops/getall', 'TroopsController@getAll');
Route::post('/troops/store/{ac_id}', 'TroopsController@store');
Route::get('/troops/converttojson', 'TroopsController@convertToJson');

Route::get('/speeds', 'SpeedController@index')->name("speeds");
Route::get('/speeds/get/{ac_id}', 'SpeedController@get');
Route::post('/speeds/store/{ac_id}', 'SpeedController@store');

Route::get('/consumption', 'ConsumptionController@index')->name("consumption");
Route::get('/consumption/get/{account_id}', 'ConsumptionController@get');
Route::post('/consumption/store/{ac_id}', 'ConsumptionController@store');

Route::get('/buildings', 'BuildingController@index')->name("buildings");
Route::get('/buildings/test', function() {
    return "hello world";
} );
Route::get('/buildings/getbuildings', 'BuildingController@getBuildings');
Route::get('/buildings/editvalues/{type}', 'BuildingController@editValues');
Route::get('/buildings/editrequired/{type}/{level}', 'BuildingController@editRequired');
Route::post('/buildings/saverequired', 'BuildingController@saveRequired');
Route::get('/buildings/getbuildinginfo/{type}/{level}', 'BuildingController@getBuildingInfo');
Route::post('/buildings/updatevalues', 'BuildingController@update');
Route::get('/buildings/setdata', 'BuildingController@setData');
Route::get('/buildings/initdata', 'BuildingController@initData');
Route::get('/buildings/show/{ac_id}/{type}/{level}', 'BuildingController@show');

Route::get('/buildingsaccount/get/{ac_id}', 'BuildingsAccountController@getAccountBuildings');
Route::post('/buildingsaccount/store/{ac_id}', 'BuildingsAccountController@store');

Route::get('/overview', 'Overview@index')->name("overview");

Route::get('/genequipment', 'GeneralEquipment@index')->name("genequipment");

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');



Route::get('/test', function() {
    return "get test";
    $currentUser = Auth::user();
    return $currentUser;
});
Route::post('/test', function() {
    return "post test";
});

Route::get('/users', function() {
    $users = User::where('id','>',0)->get()->toArray();
    $currentUser = Auth::user();
    dd($currentUser);
});

Route::get('/testlogin', function() {
    $currentUser = Auth::user();
    if(Auth::check()) {
        // return response()->json(['message'=> "user logged in"]);
        return $currentUser;
    } else {
        return response()->json(['message'=> "not logged in"]);
    }
});
Route::post('/userlogin', function(Request $request) {
    $loginDetails = $request->only('username', 'password');
    // return $loginDetails;
    if(Auth::attempt($loginDetails)) {
        $token = Auth::user()->password;
        return ["success" =>"login success", "username" => Auth::user()->username, "token" => $token];
    } else {
        return response()->json(['message'=>["type"=>"error", "message"=>"login erorrr"]]);
    }
});

Route::get('/apilogin', function(Request $request) {
    
    Log::debug("loggin in from api");
    $loginDetails = $request->only('token');
    $u = User::where('password', $loginDetails)->get()->ToArray();
    // dd($u[0]['id']);
    $id = $u[0]['id'];
    $user = User::find($id);
    Auth::login($user);
    // dd();
    if(Auth::check()) {
        $token = Auth::user()->password;
        return ["success" => "login success", "username" => Auth::user()->username, "token" => $token];
    } else {
        return ["error" => "login failed"];
    }
});

Route::post('/apiregister', 'Auth\RegisterController@api_register');


