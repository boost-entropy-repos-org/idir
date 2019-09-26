@extends(config('idir.layout') . '::web.layouts.layout', [
    'title' => [trans('idir::dirs.page.step', ['step' => 1]), trans('idir::dirs.page.create.group')],
    'desc' => [trans('idir::dirs.page.create.group')],
    'keys' => [trans('idir::dirs.page.create.group')]
])

@section('breadcrumb')
<li class="breadcrumb-item"><a href="/">{{ trans('icore::home.page.index') }}</a></li>
<li class="breadcrumb-item">{{ trans('idir::dirs.page.index') }}</li>
<li class="breadcrumb-item active" aria-current="page">
    {{ trans('idir::dirs.page.step', ['step' => 1]) }} {{ trans('idir::dirs.page.create.group') }}
</li>
@endsection

@section('content')
<div class="container">
    @include('icore::web.partials.alerts')
    <h3 class="h5 border-bottom pb-2">{{ trans('idir::dirs.page.create.group') }}</h3>
    @if ($groups->isNotEmpty())
    <div class="row">
        @foreach($groups as $group)
        <div class="col-lg col-md-6 mb-4">
            <div class="card h-100">
                @include('idir::web.dir.partials.group')
                <div class="card-footer mt-auto">
                    <a href="{{ route('web.dir.create_form', [$group->id]) }}" class="btn btn-link">
                        {{ trans('idir::dirs.page.create.index') }} &raquo;
                    </a>
                </div>
            </div>
        </div>
        @endforeach
    </div>
    @else
    <p>{{ trans('idir::groups.empty') }}</p>
    @endif
</div>
@endsection
