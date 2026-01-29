<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * @group Autenticação
 *
 * Endpoints para autenticar usuários.
 */
class AuthenticatedSessionController extends Controller
{
    /**
     * Autentica um usuário e retorna um token de acesso.
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
    public function store(Request $request)
    {
        // 1. Validação simples (email e password required)
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        // Buscar o usuário pelo email
        $user = User::where('email', $request->email)->first();

        // 3. Verificar se usuário existe e se a senha bate
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => [trans('auth.failed')],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    /**
     * Invalida o token de acesso do usuário.
     *
     * @authenticated
     */
    public function destroy(Request $request)
    {
        // Revogar o token atual do usuário
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out com sucesso']);
    }
}
