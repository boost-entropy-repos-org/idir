<?php

namespace N1ebieski\IDir\Models\Category\Dir;

use N1ebieski\IDir\Models\Category\Category as BaseCategory;

/**
 * [Category description]
 */
class Category extends BaseCategory
{
    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'model_type' => 'N1ebieski\\IDir\\Models\\Dir',
        'status' => 1,
    ];

    /**
     * Get the class name for polymorphic relations.
     *
     * @return string
     */
    public function getMorphClass()
    {
        return 'N1ebieski\\ICore\\Models\\Category\\Category';
    }

    // Relations

    /**
     * [morphs description]
     * @return [type] [description]
     */
    public function morphs()
    {
        return $this->morphedByMany('N1ebieski\IDir\Models\Dir', 'model', 'categories_models', 'category_id');
    }

    // Accessors

    /**
     * [getPoliAttribute description]
     * @return string [description]
     */
    public function getPoliAttribute() : string
    {
        return 'dir';
    }
}
