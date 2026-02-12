<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

/**
 * @group Autenticação
 *
 * Endpoints para registrar novos usuários.
 */
class RegisteredUserController extends Controller
{
    /**
     * Registra um novo usuário.
     *
     * @unauthenticated
     * @response {
     *  "access_token": "token",
     *  "token_type": "Bearer",
     *  "user": {
     *      "name": "Test User",
     *      "email": "test@example.com",
     *      "uuid": "a-uuid"
     *  }
     * }
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'isAdmin' => ['sometimes', 'boolean'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
            'isAdmin' => $request->boolean('isAdmin'),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;


        return response()->json(
            [

                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ], 201
        );
    }
}
