<?php

namespace N1ebieski\IDir\Http\ViewComponents\Comment\Dir;

use N1ebieski\ICore\Http\ViewComponents\Comment\LatestComponent as BaseLatestComponent;
use N1ebieski\IDir\Models\Comment\Dir\Comment;
use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\View\View;

/**
 * [LatestComponent description]
 */
class LatestComponent extends BaseLatestComponent
{
    /**
     * Undocumented function
     *
     * @param Comment $comment
     * @param ViewFactory $view
     * @param integer $limit
     */
    public function __construct(Comment $comment, ViewFactory $view, int $limit = 5)
    {
        parent::__construct($comment, $view, $limit);
    }

    /**
     * [toHtml description]
     * @return View [description]
     */
    public function toHtml() : View
    {
        return $this->view->make('idir::web.components.comment.dir.latest', [
            'comments' => $this->comment->makeCache()->rememberLatestByComponent([
                'limit' => $this->limit
            ])
        ]);
    }
}
