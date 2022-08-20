<?php

namespace App\Http\Controllers\Auth;

use App\Account;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {   
        // Log::debug($data);
        return Validator::make($data, [
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            // 'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            // 'mobile' => ['required'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        Log::debug($data);
        // return;
        $user = User::create([
            'username' => $data['username'],
            // 'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Account::create([
            'user_id' => $user->id,
            'name' => $user->username,
            'main' => 1,
        ]);
        return $user;
        
        // if($data['mobile']) {
        //     // $u = User::find($user->id);
        //     // Auth::login($u);
        //     return $user;
        //     return response()->json(["success" => "registersed", "token" => "poop"]);

        //     // return response()->json(["success" => "registersed", "token" => Auth::user()->password]);
        //     // return ["success" => "registersed", "token" => Auth::user()->password];
        // } else {
        // //     return response()->json(["success" => "registersed?????", "token" => Auth::user()->password]);
        //     // return ["success" => "registersed?????", "token" => Auth::user()->password];
        //     return $user;
        // }
    }

        /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function api_create(array $data)
    {
        Log::debug($data);
        // return;
        $user = User::create([
            'username' => $data['username'],
            // 'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Account::create([
            'user_id' => $user->id,
            'name' => $user->username,
            'main' => 1,
        ]);

        return $user;
    }

        /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function api_register(Request $request)
    {
        Log::debug("attempting to register from api");
        return ["g"=>"h"];
        $vally = $this->validator($request->all());
        if($vally->fails()) {
            // return redirect()->back()->withErrors($vally)->withInput();
            return ["error" => "something wrong, yeh"];
        } else {
            event(new Registered($user = $this->api_create($request->all())));
            $this->guard()->login($user);
            return ["success" => "vally worked", "username" => Auth::user()->username, "token" => Auth::user()->password];
        }


        // $this->guard()->login($user);

        // if ($response = $this->registered($request, $user)) {
        //     return ["error" => "already resgistered"];
        //     return $response;
        // }

        // return ["success" => "yayyy, we registered vie api"];

        // return $request->wantsJson()
        //             ? new Response('', 201)
        //             : redirect($this->redirectPath());
    }

}
