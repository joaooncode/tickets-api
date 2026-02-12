<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ClerkAuthenticate
{
    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Não autorizado'], 411);
        }

        try {
            // A chave PEM você pega no Dashboard do Clerk (API Keys -> JWT Templates)
            $publicKey = config('services.clerk.public_key');
            $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));

            // O 'sub' no JWT do Clerk é o ID do usuário
            $user = User::firstOrCreate(
                ['clerk_id' => $decoded->sub],
                [
                    'name' => $decoded->name ?? 'Usuário Clerk',
                    'email' => $decoded->email ?? '',
                ]
            );

            // Loga o usuário na requisição atual
            Auth::login($user);

            return $next($request);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Token inválido: ' . $e->getMessage()], 401);
        }
    }
}
