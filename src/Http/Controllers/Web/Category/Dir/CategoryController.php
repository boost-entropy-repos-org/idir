<?php

namespace N1ebieski\IDir\Http\Controllers\Web\Category\Dir;

use N1ebieski\IDir\Models\Category\Dir\Category;
use N1ebieski\ICore\Http\Requests\Web\Category\SearchRequest;
use N1ebieski\ICore\Http\Responses\Web\Category\SearchResponse;
use N1ebieski\IDir\Http\Controllers\Web\Category\Dir\Polymorphic;
use Illuminate\Http\JsonResponse;
use N1ebieski\IDir\Filters\Web\Category\ShowFilter;
use N1ebieski\IDir\Http\Requests\Web\Category\ShowRequest;
use Illuminate\View\View;
use N1ebieski\IDir\Models\Region\Region;

/**
 * [CategoryController description]
 */
class CategoryController implements Polymorphic
{
    /**
     * Display a listing of the Dirs for Category.
     *
     * @param  Category $category [description]
     * @param  Region   $region   [description]
     * @param  ShowRequest $request
     * @param  ShowFilter $filter
     * @return View [description]
     */
    public function show(Category $category, Region $region, ShowRequest $request, ShowFilter $filter) : View
    {
        return view('idir::web.category.dir.show', [
            'dirs' => $category->makeCache()->rememberDirsByFilter(
                $filter->all() + ['region' => $region->slug],
                $request->input('page') ?? 1
            ),
            'region' => $region,
            'filter' => $filter->all(),
            'category' => $category->makeCache()->rememberLoadNestedWithMorphsCountByFilter(
                ['region' => $region->slug]
            ),
            'catsAsArray' => [
                'ancestors' => $category->ancestors->pluck('id')->toArray(), 
                'self' => [$category->id]
            ]
        ]);
    }

    /**
     * Search Categories for specified name.
     *
     * @param  Category      $category [description]
     * @param  SearchRequest $request  [description]
     * @param  SearchResponse $response  [description]
     * @return JsonResponse
     */
    public function search(Category $category, SearchRequest $request, SearchResponse $response) : JsonResponse
    {
        $categories = $category->makeRepo()->getBySearch($request->get('name'));

        return $response->setCategories($categories)->makeResponse();
    }
}
