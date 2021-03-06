<?php

use Illuminate\Support\Facades\Route;

Route::patch('thumbnails/dir/{dir}/reload', 'Thumbnail\Dir\ThumbnailController@reload')
    ->name('thumbnail.dir.reload')
    ->middleware('permission:admin.dirs.view')
    ->where('dir', '[0-9]+');
