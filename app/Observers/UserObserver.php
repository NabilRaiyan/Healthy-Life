<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    public function creating(User $user)
    {
        $user->available_duration = 30;
        $user->subscribed_plan = 'basicFit';
    }
}
