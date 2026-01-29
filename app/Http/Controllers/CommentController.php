<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @group Comentários
 *
 * Endpoints para gerenciar comentários.
 */
class CommentController extends Controller
{
    /**
     * Lista todos os comentários de um ticket.
     *
     * @authenticated
     */
    public function index(Ticket $ticket)
    {
        return response()->json($ticket->comments()->with('user')->get());
    }

    /**
     * Adiciona um novo comentário a um ticket.
     *
     * @authenticated
     */
    public function store(Request $request, Ticket $ticket)
    {
        $request->validate([
            'body' => 'required|string',
        ]);

        $comment = $ticket->comments()->create([
            'user_id' => Auth::id(),
            'body' => $request->body,
        ]);

        return response()->json($comment, 201);
    }

    /**
     * Atualiza um comentário específico.
     *
     * @authenticated
     */
    public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $request->validate([
            'body' => 'required|string',
        ]);

        $comment->update([
            'body' => $request->body,
        ]);

        return response()->json($comment);
    }

    /**
     * Deleta um comentário específico.
     *
     * @authenticated
     */
    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete();

        return response()->json(null, 204);
    }
}
