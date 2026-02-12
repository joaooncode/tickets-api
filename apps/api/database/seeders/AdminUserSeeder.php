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
            'clerk_id' => 'user_39JnGLH6vnxXc9y6nsk9hPLWJTv',
        ], [
            'name' => 'João',
            'email' => 'joao.vitor.r.silva.dev@gmail.com',
            'isAdmin' => true,
            'clerk_id' => 'user_39XyFWdos84WOmtrf2nzZDOTMJS',
        ]);
    }
}
