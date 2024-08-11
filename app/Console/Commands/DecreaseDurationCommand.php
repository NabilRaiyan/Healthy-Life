<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class DecreaseDurationCommand extends Command
{
    protected $signature = 'duration:decrease';
    protected $description = 'Decrease available_duration by 1 day for all users';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Fetch all users where available_duration is greater than 0
        $users = User::where('available_duration', '>', 0)->get();

        foreach ($users as $user) {
            $user->decreaseDurationDays(1); // Decrease duration by 1 day
        }
        $this->info('Available duration decreased by 1 day for all users.');
    }
}

