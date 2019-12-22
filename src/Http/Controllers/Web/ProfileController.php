<?php

namespace N1ebieski\IDir\Http\Controllers\Web;

use Illuminate\View\View;
use N1ebieski\IDir\Filters\Web\Profile\EditDirFilter;
use N1ebieski\IDir\Http\Requests\Web\Profile\EditDirRequest;
use N1ebieski\IDir\Models\Dir;
use N1ebieski\IDir\Models\Group;

/**
 * [ProfileController description]
 */
class ProfileController
{
    /**
     * [editDir description]
     * @param  Dir            $dir     [description]
     * @param  Group          $group   [description]
     * @param  EditDirRequest $request [description]
     * @param  EditDirFilter  $filter  [description]
     * @return View                    [description]
     */
    public function editDir(Dir $dir, Group $group, EditDirRequest $request, EditDirFilter $filter) : View
    {
        return view('idir::web.profile.edit_dir', [
            'filter' => $filter->all(),
            'groups' => $group->makeRepo()->all(),
            'dirs' => $dir->makeRepo()->paginateWithRelsByUserAndFilter(auth()->user()->id, $filter->all()),
            'paginate' => config('database.paginate')
        ]);
    }
}
