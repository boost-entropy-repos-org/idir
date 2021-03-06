<?php

namespace N1ebieski\IDir\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
use N1ebieski\IDir\Services\CodeService;
use N1ebieski\IDir\Repositories\CodeRepo;

class Code extends Model
{
    // Configuration

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code',
        'quantity'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'price_id' => 'integer',
        'quantity' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Relations

    /**
     * [price description]
     * @return [type] [description]
     */
    public function price()
    {
        return $this->belongsTo('N1ebieski\IDir\Models\Price');
    }

    // Makers

    /**
     * [makeService description]
     * @return CodeService [description]
     */
    public function makeService()
    {
        return App::make(CodeService::class, ['code' => $this]);
    }

    /**
     * [makeRepo description]
     * @return CodeRepo [description]
     */
    public function makeRepo()
    {
        return App::make(CodeRepo::class, ['code' => $this]);
    }
}
