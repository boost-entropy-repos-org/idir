<div>
    @if ($payments->isNotEmpty())
        @foreach ($payments as $payment)
            <div id="payment{{ $payment->id }}" class="transition my-3">
                <div class="d-flex mb-2">
                    <small class="mr-auto">{{ trans('icore::filter.created_at') }}: {{ $payment->created_at_diff }}</small>
                    <small class="lr-auto">
                        <span class="badge badge-{{ $payment->status === 1 ? 'success' : 'warning' }}">
                            {{ trans("idir::payments.status.{$payment->status}") }}
                        </span>
                    </small>
                </div>
                <div>{!! nl2br(e($payment->logs)) !!}</div>
            </div>
        @endforeach
    @endif
</div>
