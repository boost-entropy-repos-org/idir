<?php

namespace N1ebieski\IDir\Http\Requests\Admin\Dir;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\App;
use Mews\Purifier\Facades\Purifier;
use N1ebieski\IDir\Models\BanValue;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Config;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Database\Eloquent\Collection;
use N1ebieski\IDir\Models\Category\Dir\Category;
use N1ebieski\IDir\Http\Requests\Traits\FieldsExtended;

/**
 * [StoreFormRequest description]
 */
class Store2Request extends FormRequest
{
    use FieldsExtended;

    /**
     * [private description]
     * @var string
     */
    protected $bans;

    /**
     * [__construct description]
     * @param BanValue $banValue [description]
     */
    public function __construct(BanValue $banValue)
    {
        parent::__construct();

        $this->bans = $banValue->makeCache()->rememberAllWordsAsString();
    }

    /**
     * [getFields description]
     * @return Collection [description]
     */
    public function getFields() : Collection
    {
        return $this->group->fields;
    }

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
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation() : void
    {
        $this->prepareTagsAttribute();

        $this->prepareTitleAttribute();

        $this->prepareContentHtmlAttribute();

        $this->prepareContentAttribute();

        $this->prepareUrlAttribute();

        $this->prepareFieldsAttribute();
    }

    /**
     * [prepareUrl description]
     */
    protected function prepareUrlAttribute() : void
    {
        if ($this->has('url') && $this->input('url') !== null) {
            if ($this->group->url === 0) {
                $this->merge(['url' => null]);
            } else {
                $this->merge(['url' => preg_replace('/(\/)$/', null, $this->input('url'))]);
            }
        }
    }

    /**
     * [prepareContentHtml description]
     */
    protected function prepareContentHtmlAttribute() : void
    {
        if ($this->has('content_html')) {
            if ($this->group->privileges->contains('name', 'additional options for editing content')) {
                $this->merge([
                    'content_html' => Purifier::clean($this->input('content_html'), 'dir')
                ]);
            } else {
                $this->merge([
                    'content_html' => strip_tags($this->input('content_html'))
                ]);
            }
        }
    }

    /**
     * [prepareTitle description]
     */
    protected function prepareTitleAttribute() : void
    {
        if ($this->has('title')) {
            $this->merge([
                'title' => Config::get('idir.dir.title_normalizer') !== null ?
                    Config::get('idir.dir.title_normalizer')($this->input('title'))
                    : $this->input('title')
            ]);
        }
    }

    /**
     * [prepareContent description]
     */
    protected function prepareContentAttribute() : void
    {
        if ($this->has('content_html')) {
            $this->merge([
                'content' => strip_tags($this->input('content_html'))
            ]);
        }
    }

    /**
     * [prepareTags description]
     */
    protected function prepareTagsAttribute() : void
    {
        if ($this->has('tags') && is_string($this->input('tags'))) {
            $this->merge([
                'tags' => explode(
                    ',',
                    Config::get('icore.tag.normalizer') !== null ?
                        Config::get('icore.tag.normalizer')($this->input('tags'))
                        : $this->input('tags')
                )
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return array_merge([
            'title' => 'bail|required|string|between:3,' . Config::get('idir.dir.max_title'),
            'tags' => [
                'bail',
                'nullable',
                'array',
                'between:0,' . Config::get('idir.dir.max_tags'),
                'no_js_validation'
            ],
            'tags.*' => 'bail|min:3|max:30|alpha_num_spaces',
            'categories' => [
                'bail',
                'required',
                'array',
                'between:1,' . $this->group->max_cats,
                'no_js_validation'
            ],
            'categories.*' => [
                'bail',
                'integer',
                'distinct',
                Rule::exists('categories', 'id')->where(function ($query) {
                    $query->where([
                        ['status', Category::ACTIVE],
                        ['model_type', 'N1ebieski\\IDir\\Models\\Dir']
                    ]);
                })
            ],
            'content_html' => [
                'bail',
                'required',
                'string',
                'no_js_validation',
            ],
            'content' => [
                'bail',
                'required',
                'string',
                'between:' . Config::get('idir.dir.min_content') . ',' . Config::get('idir.dir.max_content'),
                !empty($this->bans) ? 'not_regex:/(.*)(\s|^)('.$this->bans.')(\s|\.|,|\?|$)(.*)/i' : null
            ],
            'notes' => 'bail|nullable|string|between:3,255',
            'url' => [
                'bail',
                ($this->group->url === 2) ? 'required' : 'nullable',
                'string',
                'regex:/^(https|http):\/\/([\da-z\.-]+)(\.[a-z]{2,6})\/?$/',
                App::make(\N1ebieski\IDir\Rules\UniqueUrlRule::class, [
                    'table' => 'dirs',
                    'column' => 'url'
                ])
            ]
        ], $this->prepareFieldsRules());
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'content_html' => 'content'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'content.not_regex' => Lang::get('icore::validation.not_regex_contains', [
                'words' => str_replace('|', ', ', $this->bans)
            ])
        ];
    }
}
