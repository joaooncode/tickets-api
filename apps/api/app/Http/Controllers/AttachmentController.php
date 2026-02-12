<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAttachmentRequest;
use App\Models\Attachment;
use App\Models\Ticket;
use Illuminate\Support\Facades\Storage;

/**
 * @group Anexos
 *
 * Endpoints para gerenciar anexos.
 */
class AttachmentController extends Controller
{
    /**
     * Lista todos os anexos de um ticket.
     *
     * @authenticated
     */
    public function index(Ticket $ticket)
    {
        return response()->json($ticket->attachments);
    }

    /**
     * Adiciona um novo anexo a um ticket.
     *
     * @authenticated
     */
    public function store(StoreAttachmentRequest $request, Ticket $ticket)
    {
        $file = $request->file('file');
        $path = $file->store('attachments', 's3');

        $attachment = $ticket->attachments()->create([
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_type' => 'file',
            'file_size' => $file->getSize(),
        ]);

        return response()->json($attachment, 201);
    }

    /**
     * Baixa um anexo específico.
     *
     * @authenticated
     */
    public function show(Attachment $attachment)
    {
        return Storage::disk('s3')->download($attachment->file_path, $attachment->file_name);
    }

    /**
     * Deleta um anexo específico.
     *
     * @authenticated
     */
    public function destroy(Attachment $attachment)
    {
        Storage::disk('s3')->delete($attachment->file_path);
        $attachment->delete();

        return response()->json(null, 204);
    }
}
