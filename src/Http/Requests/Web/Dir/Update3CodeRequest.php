<?php

namespace N1ebieski\IDir\Http\Requests\Web\Dir;

use Illuminate\Foundation\Http\FormRequest;
use N1ebieski\IDir\Http\Requests\Traits\CodePayable;

class Update3CodeRequest extends FormRequest
{
    use CodePayable;

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

        return $url->route('web.dir.edit_3', [$this->dir->id, $this->group->id]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->prepareCodeRules();
    }
}
