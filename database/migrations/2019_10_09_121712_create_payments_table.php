<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * [CreatePaymentsTable description]
 */
class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->bigInteger('model_id')->unsigned()->nullable();
            $table->string('model_type')->nullable();
            $table->bigInteger('price_id')->unsigned();
            $table->string('price_type');
            $table->tinyInteger('status')->unsigned();
            $table->longText('logs')->nullable();
            $table->timestamps();

            $table->index(['model_type', 'model_id']);
            $table->index(['price_type', 'price_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
