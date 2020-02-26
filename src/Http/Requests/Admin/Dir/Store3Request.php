<?php

namespace N1ebieski\IDir\Http\Requests\Admin\Dir;

use N1ebieski\IDir\Http\Requests\Admin\Dir\Store2Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use N1ebieski\ICore\Models\Link;
// use Illuminate\Contracts\Validation\Validator;
// use Illuminate\Http\Exceptions\HttpResponseException;

class Store3Request extends Store2Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->group->isAvailable();
    }

    /**
     * Get the URL to redirect to on a validation error.
     *
     * @return string
     */
    protected function getRedirectUrl()
    {
        $url = $this->redirector->getUrlGenerator();

        return $url->route('admin.dir.create_3', [$this->group->id]);
    }

    /**
     * [prepareForValidation description]
     */
    protected function prepareForValidation() : void
    {
        if ($this->session()->has('dir')) {
            $this->merge($this->all() + $this->session()->get('dir'));
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
                    $this->group->backlink === 2 ? 'required' : 'nullable',
                    Rule::exists('links', 'id')->where(function($query) {
                        $query->where('links.type', 'backlink')
                            ->whereNotExists(function($query) {
                                $query->from('categories_models')
                                    ->whereRaw('`links`.`id` = `categories_models`.`model_id`')
                                    ->where('categories_models.model_type', 'N1ebieski\\ICore\\Models\\Link');
                            })->orWhereExists(function($query) {
                                $query->from('categories_models')
                                    ->whereRaw('`links`.`id` = `categories_models`.`model_id`')
                                    ->where('categories_models.model_type', 'N1ebieski\\ICore\\Models\\Link')
                                    ->whereIn('categories_models.category_id', function($query) {
                                        return $query->from('categories_closure')->select('ancestor')
                                            ->whereIn('descendant', $this->input('categories') ?? []);
                                    });
                            });
                    }),
                    'no_js_validation'
                ],
                'backlink_url' => [
                    'bail',
                    'string',
                    $this->group->backlink === 2 ? 'required' : 'nullable',
                    $this->input('url') !== null ?
                        'regex:/^' . Str::escaped($this->input('url')) . '/'
                        : 'regex:/^(https|http):\/\/([\da-z\.-]+)(\.[a-z]{2,6})/',
                    $this->group->backlink === 2 && $this->has('backlink') ?
                        app()->make('N1ebieski\\IDir\\Rules\\BacklinkRule', [
                            'link' => Link::find($this->input('backlink'))->url
                        ]) : null,
                    'no_js_validation'
                ]
            ],

            $this->group->prices->isNotEmpty() ?
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
                            ['group_id', $this->group->id]
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
                            ['group_id', $this->group->id]
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
                            ['group_id', $this->group->id]
                        ]);
                    })
                ] : ['no_js_validation']
            ] : []
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
            'backlink_url.regex' => __('validation.regex') . ' ' . trans('idir::validation.backlink_url')
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
        return parent::attributes();
    }
}
