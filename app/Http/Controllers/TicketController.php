<?php

namespace App\Http\Controllers;

use App\Interfaces\ITicketRepository;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function __construct(
        protected ITicketRepository $ticketRepository
    ) {}

    public function index(Request $request)
    {
        $filters = $request->all();

        if ($request->has('q') && ! $request->has('search')) {
            $filters['search'] = $request->input('q');
        }

        return $this->ticketRepository->getAll(
            $filters,
            $request->integer('per_page', 10)
        );
    }

    public function store(Request $request)
    {
        return $this->ticketRepository->create($request->all());
    }

    public function show(string $id)
    {
        return $this->ticketRepository->findById($id);
    }

    public function update(Request $request, string $id)
    {
        return $this->ticketRepository->update($id, $request->all());
    }

    public function destroy(string $id)
    {
        return $this->ticketRepository->delete($id);
    }

    public function assign(string $ticket, string $user)
    {
        return $this->ticketRepository->update($ticket, ['assigned_to' => $user]);
    }

    public function changeStatus(Request $request, string $ticket)
    {
        return $this->ticketRepository->update($ticket, ['status' => $request->input('status')]);
    }
}