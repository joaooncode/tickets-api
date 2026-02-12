<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Models\Ticket;
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
    public function store(StoreCommentRequest $request, Ticket $ticket)
    {
        $comment = $ticket->comments()->create([
            'user_id' => Auth::id(),
            'body' => $request->validated('body'),
        ]);

        return response()->json($comment, 201);
    }

    /**
     * Atualiza um comentário específico.
     *
     * @authenticated
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $comment->update($request->validated());

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
