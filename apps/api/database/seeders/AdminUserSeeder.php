<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'name' => 'Matheus',
            'email' => 'gollmannmatheus@gmail.com',
            'isAdmin' => true,
            'clerk_id' => 'seed_admin',
        ]);
    }
}
