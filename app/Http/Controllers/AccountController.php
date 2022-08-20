<?php

namespace App\Http\Controllers;

use App\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
// use NotificationChannels\ExpoPushNotifications\ExpoChannel;
// use NotificationChannels\ExpoPushNotifications\ExpoMessage;

class AccountController extends Controller
{
    public function __construct()
    {
        // $this->middleware('check_login');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        return view('account.account');
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
    public function store(Request $request, $username)
    {
        // ExponentPhpSDK
            // You can quickly bootup an expo instance
            Log::debug("trying to add expo noti");
    // $expo = \ExponentPhpSDK\Expo::normalSetup();
    // al
        // $user = Auth::user();
        if(Auth::check()) {
            Log::debug("trying to add user");
            $newAc = Account::create([
            'user_id' => Auth::user()->id,
            'name' => $username,
            'main' => false,
            ]);
            return ["success" => "New account added", "result" => $newAc];
        } else {
            return ["error" => "You need to login to add an account"];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function get(Account $account)
    {
        // return [["id"=>"a", "name"=>"bob"],["id"=>"b", "name"=>"jack"]];
        Log::debug("attempting to get accounts ");
        // log::debug(Auth::user()->id);
        if(Auth::check()) {
            $accounts = Account::where('user_id', '=', Auth::user()->id)->orderBy('id')->get();
            return $accounts;
        } else {
            return [];
            // return [["id"=>"aa", "name"=>"bob"],["id"=>"b", "name"=>"jack"]];
        }
        // dd($accounts);
        // return "hello from account controller";
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function edit(Account $account)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Account $account, $id, $username)
    {   
        if(Auth::check()) {
            $account = Account::find($id);
            $account->name = $username;
            $account->user_id = Auth::user()->id;
            $account->save();
            // return $username;
            return ["success" => "updated user with name " . $username, "name" => $username];
        } else
            return ["error" => "not logged in"];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function destroy(Account $account, $ac_id)
    {
        // $i = $account->usename;
        // $account->delete();
        Log::debug("deleting id $ac_id");
        $b = Account::find($ac_id);
        Log::debug("b $b");
        if($b->main) {
            return ["error" => "Cannot delete main account"];
        } else {
            $b->delete();
            return ["success" => "deleted $ac_id"];
            return $ac_id;
        }
    }
}
