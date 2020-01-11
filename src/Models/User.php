<?php

namespace N1ebieski\IDir\Models;

use N1ebieski\ICore\Models\User as BaseUser;
use Illuminate\Database\Eloquent\Relations\HasMany;
use N1ebieski\IDir\Repositories\UserRepo;

/**
 * [User description]
 */
class User extends BaseUser
{
    // Configuration

    /**
     * [protected description]
     * @var string
     */
    protected $guard_name = 'web';

    /**
     * Get the class name for polymorphic relations.
     *
     * @return string
     */
    public function getMorphClass()
    {
        return \N1ebieski\ICore\Models\User::class;
    }

    // Relations

    /**
     * [dirs description]
     * @return HasMany [description]
     */
    public function dirs() : HasMany
    {
        return $this->hasMany(\N1ebieski\IDir\Models\Dir::class);
    }

    // Makers

    /**
     * [makeRepo description]
     * @return UserRepo [description]
     */
    public function makeRepo() 
    {
        return app()->make(UserRepo::class, ['user' => $this]);
    } 
}
