<?php

namespace N1ebieski\IDir\Events\Admin\Dir;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use N1ebieski\IDir\Models\Dir;

/**
 * [Destroy description]
 */
class Destroy
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * [public description]
     * @var Dir
     */
    public $dir;

    /**
     * [public description]
     * @var string|null
     */
    public $reason;

    /**
     * [__construct description]
     * @param Dir    $dir    [description]
     * @param string|null $reason [description]
     */
    public function __construct(Dir $dir, string $reason = null)
    {
        $this->dir = $dir;
        $this->reason = $reason;
    }
}
