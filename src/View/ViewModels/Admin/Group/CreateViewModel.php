<?php

namespace N1ebieski\IDir\View\ViewModels\Admin\Group;

use Illuminate\Http\Request;
use N1ebieski\IDir\Models\Group;
use N1ebieski\IDir\Models\Price;
use Spatie\ViewModels\ViewModel;
use N1ebieski\IDir\Models\Privilege;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as Collect;

class CreateViewModel extends ViewModel
{
    /**
     * Undocumented variable
     *
     * @var Group
     */
    protected $group;

    /**
     * Undocumented variable
     *
     * @var Privilege
     */
    protected $privilege;

    /**
     * Undocumented variable
     *
     * @var Price
     */
    protected $price;

    /**
     * Undocumented variable
     *
     * @var Request
     */
    protected $request;

    /**
     * Undocumented variable
     *
     * @var Collect
     */
    protected $collect;

    /**
     * Undocumented function
     *
     * @param Group $group
     * @param Privilege $privilege
     * @param Price $price
     * @param Request $request
     * @param Collect $collect
     */
    public function __construct(
        Group $group,
        Privilege $privilege,
        Price $price,
        Request $request,
        Collect $collect
    ) {
        $this->group = $group;
        $this->privilege = $privilege;
        $this->price = $price;

        $this->request = $request;
        $this->collect = $collect;
    }

    /**
     * Undocumented function
     *
     * @return Collection
     */
    public function privileges() : Collection
    {
        return $this->privilege->orderBy('name', 'asc')->get();
    }

    /**
     * Undocumented function
     *
     * @return Collection
     */
    public function groups() : Collection
    {
        return $this->group->orderBy('id', 'asc')->get();
    }

    /**
     * Undocumented function
     *
     * @param string $type
     * @return Collection
     */
    public function pricesSelectionByType(string $type) : Collection
    {
        $prices = is_array($this->request->old("prices.{$type}")) ?
            $this->collect->make($this->request->old("prices.{$type}"))
                ->filter(function ($item) {
                    return isset($item['select']) && $item['price'] !== null;
                })
                ->map(function ($item) {
                    if (!is_numeric($item['price'])) {
                        $item['price'] = null;
                    }

                    return $item;
                })
                ->toArray()
            : [];

        return $this->price->hydrate(array_merge($prices, [['type' => $type]]));
    }
}
