<?php

namespace N1ebieski\IDir\Listeners\Dir;

use Illuminate\Contracts\Mail\Mailer;
use N1ebieski\IDir\Mail\Dir\DeletedMail;
use Illuminate\Contracts\Foundation\Application as App;

/**
 * [SendDeleteNotification description]
 */
class SendDeletedNotification
{
    /**
     * Undocumented variable
     *
     * @var object
     */
    protected $event;

    /**
     * Undocumented variable
     *
     * @var Mailer
     */
    protected $mailer;

    /**
     * Undocumented variable
     *
     * @var App
     */
    protected $app;

    /**
     * Undocumented function
     *
     * @param Mailer $mailer
     * @param App $app
     */
    public function __construct(Mailer $mailer, App $app)
    {
        $this->mailer = $mailer;
        $this->app = $app;
    }

    /**
     *
     * @return bool
     */
    public function verify() : bool
    {
        return optional($this->event->dir->user)->email
            && optional($this->event->dir->user)->hasPermissionTo('web.dirs.notification');
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $this->event = $event;

        if (!$this->verify()) {
            return;
        }

        $this->mailer->send($this->app->make(DeletedMail::class, [
            'dir' => $event->dir,
            'reason' => $event->reason
        ]));
    }
}
