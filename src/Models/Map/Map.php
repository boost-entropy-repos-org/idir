<?php

namespace N1ebieski\IDir\Models\Map;

use Illuminate\Database\Eloquent\Model;
use N1ebieski\ICore\Models\Traits\Polymorphic;

/**
 * [Map description]
 */
class Map extends Model
{
    use Polymorphic;
    
    // Configuration

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'lat',
        'long'
    ];
}
