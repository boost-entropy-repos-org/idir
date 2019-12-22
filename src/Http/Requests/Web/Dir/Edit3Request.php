<?php

namespace N1ebieski\IDir\Http\Requests\Web\Dir;

use N1ebieski\IDir\Http\Requests\Web\Dir\Update2Request;
use N1ebieski\ICore\Models\Link;
use N1ebieski\ICore\Models\BanValue;

/**
 * [Edit3Request description]
 */
class Edit3Request extends Update2Request
{
    /**
     * [private description]
     * @var Link
     */
    protected $link;

    /**
     * [__construct description]
     * @param Link     $link     [description]
     * @param BanValue $banValue [description]
     */
    public function __construct(Link $link, BanValue $banValue)
    {
        $this->link = $link;

        parent::__construct($banValue);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $check = $this->group->isPublic();

        return $this->dir->isGroup($this->group->id) ?
            $check : $check && $this->group->isAvailable();
    }

    /**
     * Get the URL to redirect to on a validation error.
     *
     * @return string
     */
    protected function getRedirectUrl()
    {
        $url = $this->redirector->getUrlGenerator();

        return $url->route('web.dir.edit_2', [$this->dir->id, $this->group->id]);
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation() : void
    {
        if ($this->group->prices->isNotEmpty()) {
            $this->preparePaymentTypeOldAttribute();

            $this->preparePaymentCodeSmsModelOldAttribute();

            $this->preparePaymentCodeTransferModelOldAttribute();
        }

        $this->prepareBacklinkModelOldAttribute();

        if ($this->session()->has("dirId.{$this->dir->id}")) {
            $this->merge($this->session()->get("dirId.{$this->dir->id}"));
        }

        parent::prepareForValidation();
    }

    /**
     * [preparePaymentTypeOldAttribute description]
     */
    protected function preparePaymentTypeOldAttribute() : void
    {
        if (!$this->old('payment_type')) {
            session()->put(
                '_old_input.payment_type', $this->group->prices->sortByDesc('type')->first()->type
            );
        }
    }

    /**
     * [preparePaymentCodeSmsModelOldAttribute description]
     */
    protected function preparePaymentCodeSmsModelOldAttribute() : void
    {
        if ($this->old('payment_code_sms')) {
            session()->flash('_old_input.payment_code_sms_model',
                $this->group->prices->where('id', old('payment_code_sms'))->first()
            );
        }
    }

    /**
     * [preparePaymentCodeTransferModelOldAttribute description]
     */
    protected function preparePaymentCodeTransferModelOldAttribute() : void
    {
        if ($this->old('payment_code_transfer')) {
            session()->flash('_old_input.payment_code_transfer_model',
                $this->group->prices->where('id', old('payment_code_transfer'))->first()
            );
        }
    }

    /**
     * [prepareBacklinkModelOldAttribute description]
     */
    protected function prepareBacklinkModelOldAttribute() : void
    {
        if ($this->old('backlink')) {
            session()->flash('_old_input.backlink_model',
                $this->link->find($this->old('backlink'))
            );
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return parent::rules();
    }
}