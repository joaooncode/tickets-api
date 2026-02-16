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
        // Cria ou encontra o Matheus
        User::firstOrCreate(
            ['email' => 'gollmannmatheus@gmail.com'], // Único por email
            [
                'name' => 'Matheus',
                'isAdmin' => true,
                'clerk_id' => 'user_39JnGLH6vnxXc9y6nsk9hPLWJTv',
            ]
        );

        // Cria ou encontra o João
        User::firstOrCreate(
            ['email' => 'joao.vitor.r.silva.dev@gmail.com'],
            [
                'name' => 'João',
                'isAdmin' => true,
                'clerk_id' => 'user_39XyFWdos84WOmtrf2nzZDOTMJS',
            ]
        );
    }
}
