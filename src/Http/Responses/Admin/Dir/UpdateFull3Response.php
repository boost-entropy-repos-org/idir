<?php

namespace N1ebieski\IDir\Http\Responses\Admin\Dir;

use N1ebieski\IDir\Models\Dir;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Contracts\Config\Repository as Config;
use Illuminate\Contracts\Translation\Translator as Lang;
use Illuminate\Contracts\Routing\UrlGenerator as URL;
use Illuminate\Http\RedirectResponse;

/**
 * [UpdateFull3Response description]
 */
class UpdateFull3Response
{
    /**
     * [private description]
     * @var Dir
     */
    protected $dir;

    /**
     * [private description]
     * @var ResponseFactory
     */
    protected $response;

    /**
     * [private description]
     * @var Config
     */
    protected $config;

    /**
     * Undocumented variable
     *
     * @var Lang
     */
    protected $lang;

    /**
     * Undocumented variable
     *
     * @var URL
     */
    protected $url;

    /**
     * Undocumented function
     *
     * @param ResponseFactory $response
     * @param Config $config
     * @param Lang $lang
     * @param URL $url
     */
    public function __construct(ResponseFactory $response, Config $config, Lang $lang, URL $url)
    {
        $this->response = $response;
        $this->config = $config;
        $this->lang = $lang;
        $this->url = $url;
    }

    /**
     * @param Dir $dir
     *
     * @return static
     */
    public function setDir(Dir $dir)
    {
        $this->dir = $dir;

        return $this;
    }

    /**
     * [response description]
     * @return RedirectResponse [description]
     */
    public function makeResponse() : RedirectResponse
    {
        switch ($this->dir->status) {
            case Dir::INACTIVE:
                return $this->response->redirectToRoute('admin.dir.index')
                    ->with('success', $this->lang->get('idir::dirs.success.update.status_0'));
            case DIr::ACTIVE:
                return $this->response->redirectToRoute('admin.dir.index')
                    ->with('success', $this->lang->get('idir::dirs.success.update.status_1'));
            case Dir::PAYMENT_INACTIVE:
                return $this->response->redirectToRoute('web.payment.dir.show', [
                    $this->dir->getPayment()->uuid,
                    'redirect' => $this->url->route('admin.dir.index')
                ]);
        }
    }
}
