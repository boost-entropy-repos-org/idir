<?php

namespace N1ebieski\IDir\Http\Requests\Web\Dir;

use N1ebieski\IDir\Http\Requests\Web\Dir\StoreFormRequest;
use N1ebieski\ICore\Http\ViewComponents\CaptchaComponent as Captcha;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use N1ebieski\ICore\Models\Link;
// use Illuminate\Contracts\Validation\Validator;
// use Illuminate\Http\Exceptions\HttpResponseException;

class StoreSummaryRequest extends StoreFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the URL to redirect to on a validation error.
     *
     * @return string
     */
    protected function getRedirectUrl()
    {
        $url = $this->redirector->getUrlGenerator();

        return $url->route('web.dir.create_summary', [$this->group_dir_available->id]);
    }

    protected function prepareForValidation()
    {
        if ($this->session()->has('dir')) {
            $this->merge($this->session()->get('dir'));
        }

        parent::prepareForValidation();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return array_merge(

            parent::rules(),

            [
                'backlink' => [
                    'bail',
                    'integer',
                    $this->group_dir_available->backlink === 2 ? 'required' : 'nullable',
                    Rule::exists('links', 'id')->where(function($query) {
                        $query->where('links.type', 'backlink')
                            ->whereNotExists(function ($query) {
                                $query->from('categories_models')
                                    ->whereRaw('links.id = categories_models.model_id')
                                    ->where('categories_models.model_type', 'N1ebieski\\ICore\\Models\\Link');
                            })->orWhereExists(function($query) {
                                $query->from('categories_models')
                                    ->whereRaw('links.id = categories_models.model_id')
                                    ->where('categories_models.model_type', 'N1ebieski\\ICore\\Models\\Link')
                                    ->whereIn('categories_models.category_id', $this->input('categories'));
                            });
                    }),
                    'no_js_validation'
                ],
                'backlink_url' => [
                    'bail',
                    'string',
                    $this->group_dir_available->backlink === 2 ? 'required' : 'nullable',
                    $this->input('url') !== null ?
                        'regex:/^' . Str::escaped($this->input('url')) . '/'
                        : 'regex:/^(https|http):\/\/([\da-z\.-]+)(\.[a-z]{2,6})/',
                    $this->group_dir_available->backlink === 2 ?
                        app()->make('N1ebieski\\IDir\\Rules\\Backlink', [
                            'link' => Link::find($this->input('backlink'))->url
                        ]) : null,
                    'no_js_validation'
                ]
            ],

            $this->group_dir_available->prices->isNotEmpty() ?
            [
                'payment_type' => 'bail|required|string|in:transfer,code_sms,code_transfer|no_js_validation',
                'payment_transfer' => $this->input('payment_type') === 'transfer' ?
                [
                    'bail',
                    'required_if:payment_type,transfer',
                    'integer',
                    Rule::exists('prices', 'id')->where(function($query) {
                        $query->where([
                            ['type', 'transfer'],
                            ['group_id', $this->group_dir_available->id]
                        ]);
                    })
                ] : ['no_js_validation'],
                'payment_code_sms' => $this->input('payment_type') === 'code_sms' ?
                 [
                    'bail',
                    'required_if:payment_type,code_sms',
                    'integer',
                    Rule::exists('prices', 'id')->where(function($query) {
                        $query->where([
                            ['type', 'code_sms'],
                            ['group_id', $this->group_dir_available->id]
                        ]);
                    })
                ] : ['no_js_validation'],
                'payment_code_transfer' => $this->input('payment_type') === 'code_transfer' ?
                [
                    'bail',
                    'required_if:payment_type,code_transfer',
                    'integer',
                    Rule::exists('prices', 'id')->where(function($query) {
                        $query->where([
                            ['type', 'code_transfer'],
                            ['group_id', $this->group_dir_available->id]
                        ]);
                    })
                ] : ['no_js_validation']
            ] :  app()->make(Captcha::class)->toRules()
        );
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'backlink_url.regex' => __('validation.regex') . ' ' . trans('idir::validation.backlink_url'),
            'body.required'  => 'A message is required',
        ];
    }

    // /**
    //  * Failed validation disable redirect
    //  *
    //  * @param Validator $validator
    //  */
    // protected function failedValidation(Validator $validator)
    // {
    //     throw new HttpResponseException(response()->view('icore::web.home.index'));
    //     // throw new HttpResponseException(response()->json($validator->errors(), 422));
    // }

    public function attributes()
    {
        return array_merge(parent::attributes(), app()->make(Captcha::class)->toAttributes());
    }
}
