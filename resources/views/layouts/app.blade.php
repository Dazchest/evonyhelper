<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">asdasd
<head>asdasdvdfvdfv
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="{{ asset('js/app.js') }}" ></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app" class="container">

        {{-- <nav class="navbar navbar-light light-blue lighten-4"> --}}
        <nav class="navbar navbar-light bg-white shadow-sm">
            <div class="container">

            <a class="navbar-brand" href="{{ url('/') }}">
                {{ config('app.name', 'Laravel') }}
            </a>

            <!-- Collapse button -->
            <button class="navbar-toggler toggler-example" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1"
                aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
                <span class="dark-blue-text">
                    {{-- <i class="fas fa-bars fa-1x" style="background-image: url('https://mdbootstrap.com/img/svg/hamburger1.svg?color=6a1b9a'); font-size:1.1em"></i> --}}
                    Menu
                </span>
            </button>

            <!-- Collapsible content -->
            <div class="collapse navbar-collapse dropdown-menu dropdown-menu-right" style="background-coloR:#c55" id="navbarSupportedContent1">

                <!-- Links -->
                <ul class="navbar-nav ml-auto">
                    {{-- <li class="nav-item active">
                        <a class="dropdown-item" href="{{ url('/') }}">Home <span class="sr-only">(current)</span></a>
                    </li> --}}

                    <li class="nav-item">
                        <a class="dropdown-item" href="{{ route('resources') }}">
                            {{ __('Resources') }}
                        </a>
                    </li>

                    <a class="dropdown-item" href="{{ route('speeds') }}">
                        {{ __('Speeds') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('troops') }}">
                        {{ __('Troops') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('accounts') }}">
                        {{ __('Accounts') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('buildings') }}">
                        {{ __('Buildings') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('consumption') }}">
                        {{ __('Consumption') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('helpers') }}">
                        {{ __('Helpers') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('cards') }}">
                        {{ __('Cards') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('overview') }}">
                        {{ __('Overview') }}
                    </a>
                    <a class="dropdown-item" href="{{ route('genequipment') }}">
                        {{ __('Gen Equip') }}
                    </a>

                    <div class="dropdown-divider"></div>


                    @guest
                        <li class="nav-item">
                            <a class="dropdown-item" href="{{ route('login') }}">{{ __('Login') }}</a>
                        </li>
                        @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="dropdown-item" href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                        @endif
                    @else
                        <a class="dropdown-item" href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();">
                            {{ __('Logout') }}
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    @endguest
            </ul>
                <!-- Links -->

            </div>
            <!-- Collapsible content -->
            </div>
        </nav>



        <main class="py-4">
            @yield('content')
        </main>
    </div>



    <div class="modal" id="myModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p id="t">Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              {{-- <button type="button" class="btn btn-primary">Save changes</button> --}}
              {{-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> --}}
            </div>
          </div>
        </div>
      </div>

    <div class="toast" style="position: fixed; top:350; display:none" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
        {{-- <img src="..." class="rounded mr-2" alt="..."> --}}
        <strong class="mr-auto">Hey!!!</strong>
        {{-- <small>11 mins ago</small> --}}
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="toast-body">
        Please log in to autosave changes.
    </div>
    </div>
</body>
</html>
