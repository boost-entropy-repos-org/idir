<div class="form-group">
    <label for="backlink">{{ trans('idir::dirs.choose_backlink') }}:</label>
    <select class="form-control @isValid('backlink')" id="backlink" name="backlink">
        @foreach ($backlinks as $backlink)
        <option value="{{ $backlink->id }}"
        {{ old('backlink', $dir->backlink->link_id ?? null) == $backlink->id ? 'selected' : null }}
        data="{{ json_encode($backlink->only(['name', 'url', 'img_url_from_storage'])) }}">
            {{ $backlink->name }} [{{ $backlink->url }}]
        </option>
        @endforeach
    </select>
    @includeWhen($errors->has('backlink'), 'icore::web.partials.errors', ['name' => 'backlink'])
</div>
<div class="form-group">
    <textarea class="form-control" id="backlink_code" rows="5" readonly>{{ optional(old('backlink_model', $backlinks->first()))->link_as_html }}</textarea>
</div>
<div class="form-group">
    <label for="backlink_url">{{ trans('idir::dirs.backlink_url') }}:</label>
    <input type="text" name="backlink_url" id="backlink_url" placeholder="https://"
    value="{{ old('backlink_url', $dir->backlink->url ?? null) }}" class="form-control @isValid('backlink_url')">
    @includeWhen($errors->has('backlink_url'), 'icore::web.partials.errors', ['name' => 'backlink_url'])
</div>
