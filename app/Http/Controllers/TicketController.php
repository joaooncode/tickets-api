<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\TicketService;
use App\Http\Resources\TicketResource;
use App\Http\Resources\TicketCollection;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @group Tickets
 *
 * Endpoints para gerenciar tickets.
 */
class TicketController extends Controller
{
    public function __construct(
        protected TicketService $ticketService
    )
    {
    }

    /**
     * Lista todos os tickets.
     *
     * @authenticated
     */
    public function index(Request $request)
    {
        $tickets = $this->ticketService->listTickets($request->all());
        return new TicketCollection($tickets);
    }

    /**
     * Lista os tickets do usuário autenticado.
     *
     * @authenticated
     */
    public function userTickets(Request $request)
    {
        $tickets = $this->ticketService->listTickets(array_merge($request->all(), ['user_id' => Auth::id()]));
        return new TicketCollection($tickets);
    }

    /**
     * Lista os tickets atribuídos ao usuário autenticado.
     *
     * @authenticated
     */
    public function assignedTickets(Request $request)
    {
        $tickets = $this->ticketService->listTickets(array_merge($request->all(), ['assigned_to' => Auth::id()]));
        return new TicketCollection($tickets);
    }

    /**
     * Lista os tickets não atribuídos.
     *
     * @authenticated
     */
    public function unassignedTickets(Request $request)
    {
        $tickets = $this->ticketService->listTickets(array_merge($request->all(), ['unassigned' => true]));
        return new TicketCollection($tickets);
    }

    /**
     * Cria um novo ticket.
     *
     * @authenticated
     */
    public function store(StoreTicketRequest $request)
    {
        $ticket = $this->ticketService->createTicket($request->validated());
        return new TicketResource($ticket);
    }

    /**
     * Exibe um ticket específico.
     *
     * @authenticated
     */
    public function show(string $id)
    {
        $ticket = $this->ticketService->findTicket($id);
        return new TicketResource($ticket);
    }

    /**
     * Atualiza um ticket específico.
     *
     * @authenticated
     */
    public function update(UpdateTicketRequest $request, string $id)
    {
        $ticket = $this->ticketService->updateTicket($id, $request->validated());
        return new TicketResource($ticket);
    }

    /**
     * Deleta um ticket específico.
     *
     * @authenticated
     */
    public function destroy(string $id)
    {
        $this->ticketService->deleteTicket($id);
        return response()->json(null, 204);
    }

    /**
     * Atribui um ticket a um usuário.
     *
     * @authenticated
     */
    public function assign(Request $request, string $ticketId, string $userId)
    {
        $ticket = $this->ticketService->assignTicket($ticketId, $userId);
        return new TicketResource($ticket);
    }

    /**
     * Altera o status de um ticket.
     *
     * @authenticated
     */
    public function changeStatus(Request $request, string $ticketId)
    {
        $ticket = $this->ticketService->changeTicketStatus($ticketId, $request->input('status'));
        return new TicketResource($ticket);
    }
}
