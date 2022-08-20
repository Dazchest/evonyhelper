@extends('layouts.app')

@section('content')
    <input type="hidden" id="troopData" data="{{$data ?? ''}}" />
    <div class="container" id="troopsroot"></div>
@endsection

{{-- @foreach ($data ?? '' as $item)
    @foreach ($item as $troop)
    <p>{{ $troop }}</p>

    @endforeach
@endforeach --}}
helloddd
<script src=" {{asset('js/components/troopResCalc.js')}} " defer></script>
