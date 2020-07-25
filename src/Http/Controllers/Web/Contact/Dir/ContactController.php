<?php

namespace N1ebieski\IDir\Http\Controllers\Web\Contact\Dir;

use N1ebieski\IDir\Models\Dir;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Response;
use N1ebieski\IDir\Mail\Contact\Dir\Mail as ContactMail;
use N1ebieski\IDir\Http\Requests\Web\Contact\Dir\SendRequest;
use N1ebieski\IDir\Http\Requests\Web\Contact\Dir\ShowRequest;
use N1ebieski\IDir\Http\Controllers\Web\Contact\Dir\Polymorphic;

/**
 * [ContactController description]
 */
class ContactController implements Polymorphic
{
    /**
     * Undocumented function
     *
     * @param Dir $dir
     * @param ShowRequest $request
     * @return JsonResponse
     */
    public function show(Dir $dir, ShowRequest $request) : JsonResponse
    {
        return Response::json([
            'view' => View::make('idir::web.contact.dir.show')->render()
        ]);
    }

    /**
     * Undocumented function
     *
     * @param Dir $dir
     * @param SendRequest $request
     * @return JsonResponse
     */
    public function send(Dir $dir, SendRequest $request) : JsonResponse
    {
        Mail::send(App::make(ContactMail::class, ['dir' => $dir]));

        return Response::json([
            'success' => Lang::get('idir::contact.dir.success.send')
        ]);
    }
}
