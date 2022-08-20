<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBuildingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buildings', function (Blueprint $table) {
            $table->id();
            $table->integer('type');
            $table->char('name');
            $table->integer('level');
            $table->integer('food');
            $table->integer('wood');
            $table->integer('stone');
            $table->integer('iron');
            $table->integer('time');
            $table->json('requiredBuilding');
            $table->json('requiredResearch');
            $table->char('temp1');
            $table->char('temp2');
            $table->json('unlocks');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('buildings');
    }
}
