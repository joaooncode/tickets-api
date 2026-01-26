<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\TicketService;
use App\Http\Resources\TicketResource;
use App\Http\Resources\TicketCollection;
use App\Http\Requests\StoreTicketRequest; // Crie esse request depois
use App\Http\Requests\UpdateTicketRequest; // Crie esse request depois
use Illuminate\Http\Request;

class TicketController extends Controller
{
public function __construct(
protected TicketService $ticketService
) {}

public function index(Request $request)
{
$tickets = $this->ticketService->listTickets($request->all());
return new TicketCollection($tickets);
}

public function store(StoreTicketRequest $request)
{
$ticket = $this->ticketService->createTicket($request->validated());
return new TicketResource($ticket);
}

public function show(string $id)
{
$ticket = $this->ticketService->findTicket($id);
return new TicketResource($ticket);
}

public function update(UpdateTicketRequest $request, string $id)
{
$ticket = $this->ticketService->updateTicket($id, $request->validated());
return new TicketResource($ticket);
}

public function destroy(string $id)
{
$this->ticketService->deleteTicket($id);
return response()->json(null, 204);
}
}
