<?php

namespace N1ebieski\IDir\Loads\Web\Dir;

use Illuminate\Http\Request;

/**
 * [Create2Load description]
 */
class Create2Load
{
    /**
     * [__construct description]
     * @param Request $request [description]
     */
    public function __construct(Request $request)
    {
        $request->route('group')
            ->loadCount(['dirs', 'dirsToday'])
            ->load([
                'privileges',
                'fields' => function ($query) {
                    $query->orderBy('position', 'asc');
                }
            ]);
    }
}
