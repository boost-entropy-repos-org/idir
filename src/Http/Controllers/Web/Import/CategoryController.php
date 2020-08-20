<?php

namespace N1ebieski\IDir\Http\Controllers\Web\Import;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Response as HttpResponse;
use N1ebieski\IDir\Models\Category\Dir\Category;
use N1ebieski\IDir\Http\Requests\Web\Import\Category\ShowRequest;

class CategoryController
{
    /**
     * Undocumented function
     *
     * @param Category $category
     * @return RedirectResponse
     */
    public function show(Category $category, ShowRequest $request) : RedirectResponse
    {
        return Response::redirectToRoute(
            'web.category.dir.show',
            [
                $category->slug,
                'page' => $request->input('page')
            ],
            HttpResponse::HTTP_MOVED_PERMANENTLY
        );
    }
}
