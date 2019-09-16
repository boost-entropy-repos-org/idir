<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <title>{{ app('Helpers\View')->makeMeta(array_merge($title, [config('app.name')]), ' - ') }}</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="{{ app('Helpers\View')->makeMeta(array_merge($desc, [config('app.desc')]), '. ') }}">
    <meta name="keywords" content="{{ strtolower(app('Helpers\View')->makeMeta(array_merge($keys, [config('app.keys')]), ', ')) }}">
    <meta name="robots" content="{{ $index }}">
    <meta name="robots" content="{{ $follow }}">

    <meta property="og:title" content="{{ $og['title'] }}">
    <meta property="og:description" content="{{ $og['desc'] }}">
    <meta property="og:type" content="{{ $og['type'] }}">
    <meta property="og:image" content="{{ $og['image'] }}">
    <meta property="og:url" content="{{ url()->current() }}">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Styles -->
    <link href="{{ asset('css/vendor/icore/vendor/vendor.css') }}" rel="stylesheet">
    <link href="{{ app('Helpers\View')->getStylesheet() }}" rel="stylesheet">

    <!-- Scripts -->
    <script src="{{ asset('js/vendor/icore/vendor/vendor.js') }}"></script>
    <script src="{{ asset('js/vendor/icore/web/web.js') }}"></script>
</head>
<body>

    @include('idir::web.partials.nav')

    <div class="content">
        @include('icore::web.partials.breadcrumb')
        @yield('content')
    </div>

    @include('icore::web.partials.footer')

    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <script src="{{ asset('js/vendor/icore/web/scripts.js') }}" defer></script>
    @stack('script')

</body>
</html>
