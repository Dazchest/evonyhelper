@extends('layouts.app')


@section('content')
    @if($resData)
        <h3>Resources</h3>
        <table class="table">
            <tr><td>Name</td><td>Food</td><td>Wood</td><td>Stone</td><td>Iron</td></tr>
            @php
                $totals = [0,0,0,0];
            @endphp
        @foreach ($resData as $ac)
            <tr>
                <td>{{ $ac->ac_id }} - {{ $ac->name }}</td>
                    @php
                        $res = json_decode($ac->data);
                        $i = 0;
                    @endphp

                    @foreach ($res as $resType)
                        <td>{{$resType->total}}</td>
                        @php $totals[$i] += $resType->total; $i++ @endphp
                    @endforeach 
            </tr>
        @endforeach

        <tr><td>Totals</td><td>{{$totals[0]}}</td><td>{{$totals[1]}}</td><td>{{$totals[2]}}</td><td>{{$totals[3]}}</td></tr>
    </table>
@endif

@if(isset($speedData) )
    <h3>Speeds</h3>
    <table class="table">
        <tr><td>Name</td><td>Food</td><td>Wood</td><td>Stone</td><td>Iron</td></tr>
        @php
            $totals = [0,0,0,0,0,0,0,0,0,0,0,0];
        @endphp
    @foreach ($speedData as $ac)
        <tr>
            <td>{{ $ac->ac_id }} - {{ $ac->name }}</td>
                @php
                    $speed = json_decode($ac->data);
                    $i = 0;
                @endphp

                @foreach ($speed as $speedType)
                    <td>{{$speedType->total}}</td>
                    @php $totals[$i] += $speedType->total; $i++ @endphp
                @endforeach 
        </tr>
    @endforeach

    <tr><td>Totals</td><td>{{$totals[0]}}</td><td>{{$totals[1]}}</td><td>{{$totals[2]}}</td><td>{{$totals[3]}}</td></tr>
</table>
@endif

@endsection