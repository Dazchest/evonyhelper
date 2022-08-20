
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>


    {{-- <script src="{{ asset('js/app.js') }}" defer></script> --}}
    <script src="{{ asset('js/cardcomposer.js') }}" defer></script>
    <script src="{{ asset('js/app.js') }}" defer></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">


</head>
<body>
    Cards

    <div class="card" id="card_qty">
        <form id="card_qty_form">
            <div>Green <input type="number" value=50></div>
            <div>Blue <input type="number" value=50></div>
            <div>Purple <input type="number" value=50></div>
            <div>Orange <input type="number" value=50></div>
            <div>Red <input type="number" value=50></div>
        </form>
    </div>

    <br><br><br>
    <div id="compose_qty">
        {{-- <form id="compose_qty_form" onchange="update_max()"> --}}
        <form id="compose_qty_form">
            <div>one - <label>hello</label> <input id="one" type="number"></div>
            <div>two - <label>hello</label>   <input type="number"></div>
            <div>three - <label>hello</label> <input type="number"></div>
            <div>four - <label>hello</label> <input type="number"></div>
            <div>five - <label>hello</label> <input type="number"></div>
            <div>six - <label>hello</label> <input type="number"></div>
            <div>seven - <label>hello</label> <input type="number"></div>
            <div>eight - <label>hello</label> <input type="number"></div>
            <div>nine - <label>hello</label> <input type="number"></div>
            <div>ten - <label>hello</label> <input type="number"></div>
        </form>
    </div>

    <div id="root">glgl</div>
    <div id="cards">cards head</div>
</body>
</html>
