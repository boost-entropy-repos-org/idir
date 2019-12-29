<?php

namespace N1ebieski\IDir\Loads\Admin\Dir;

use Illuminate\Http\Request;

/**
 * [UpdateLoad description]
 */
class UpdateLoad
{
    /**
     * [__construct description]
     * @param Request $request [description]
     */
    public function __construct(Request $request)
    {
        $request->route('dir')->load([
            'group',
            'group.privileges',
            'group.fields',
            'fields',
            'categories',
            'tags'
        ]);
    }
}
