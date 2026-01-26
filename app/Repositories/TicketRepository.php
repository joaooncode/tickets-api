<?php

namespace App\Repositories;

use App\Interfaces\ITicketRepository;
use App\Models\Ticket;

class TicketRepository implements ITicketRepository
{

    public function getAll(array $filters = [], int $perPage = 10)
    {
        $query = Ticket::query()->with(['user', 'agent']);


        // O usuário padrão só pode ver os seus tickets

        if (isset($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        // Filtro por status
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->paginate($perPage);

    }

    public function findById(string $id): ?Ticket
    {
        return Ticket::with(['user', 'agent', 'comments'])->findOrFail($id);
    }

    public function create(array $data): Ticket
    {
        return Ticket::create($data);
    }

    public function update(string $id, array $data): Ticket
    {
        $ticket = $this->findById($id);

        $ticket->update($data);

        return $ticket;
    }

    public function delete(string $id)
    {
        return Ticket::destroy($id);
    }
}
