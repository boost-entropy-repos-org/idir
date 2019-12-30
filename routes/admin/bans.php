<?php

use Illuminate\Support\Facades\Route;

Route::get('bans/dir/{dir}/create', 'BanModel\Dir\BanModelController@create')
    ->middleware('permission:create bans')
    ->name('banmodel.dir.create')
    ->where('dir', '[0-9]+');
Route::post('bans/dir/{dir}', 'BanModel\Dir\BanModelController@store')
    ->middleware('permission:create bans')
    ->name('banmodel.dir.store')
    ->where('dir', '[0-9]+');
