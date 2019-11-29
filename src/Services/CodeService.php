<?php

namespace N1ebieski\IDir\Services;

use N1ebieski\ICore\Services\Serviceable;
use Illuminate\Database\Eloquent\Model;
use N1ebieski\IDir\Models\Code;
use Carbon\Carbon;

/**
 * [CodeService description]
 */
class CodeService implements Serviceable
{
    /**
     * [private description]
     * @var Code
     */
    protected $code;

    /**
     * @param Code $code
     */
    public function __construct(Code $code)
    {
        $this->code = $code;
    }

    /**
     * [organizeGlobal description]
     * @param array $attributes [description]
     */
    public function organizeGlobal(array $attributes) : void
    {
        if (isset($attributes['sync'])) {
            $this->clear();

            if (isset($attributes['codes'])) {
                $this->createGlobal($attributes['codes']);
            }
        }
    }

    /**
     * [createGlobal description]
     * @param array $codes [description]
     */
    public function createGlobal(array $codes) : void
    {
        foreach ($codes as $code) {
            $_code = $this->code->make($code);
            $_code->price()->associate($this->code->getPrice());
            $_code->created_at = Carbon::now();
            $_code->updated_at = Carbon::now();

            $_codes_model[] = $_code->attributesToArray();
        }

        $this->code->insert($_codes_model);
    }

    /**
     * [create description]
     * @param  array $attributes [description]
     * @return Model             [description]
     */
    public function create(array $attributes) : Model
    {
        //
    }

    /**
     * [update description]
     * @param  array $attributes [description]
     * @return bool              [description]
     */
    public function update(array $attributes) : bool
    {
        //
    }

    /**
     * [updateStatus description]
     * @param  array $attributes [description]
     * @return bool              [description]
     */
    public function updateStatus(array $attributes) : bool
    {
        //
    }

    /**
     * [delete description]
     * @return bool [description]
     */
    public function delete() : bool
    {
        //
    }

    /**
     * [clear description]
     * @return int [description]
     */
    public function clear() : int
    {
        return $this->code->where('price_id', $this->code->getPrice()->id)->delete();
    }

    /**
     * [deleteGlobal description]
     * @param  array $ids [description]
     * @return int        [description]
     */
    public function deleteGlobal(array $ids) : int
    {
        //
    }
}