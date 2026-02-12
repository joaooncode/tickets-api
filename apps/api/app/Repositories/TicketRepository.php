<?php

namespace App\Repositories;

use App\Enums\TicketStatus;
use App\Interfaces\ITicketRepository;
use App\Models\Ticket;

class TicketRepository implements ITicketRepository
{

    public function getAll(array $filters = [], int $perPage = 10)
    {
        if (!empty($filters['search'])) {
            $query = Ticket::search($filters['search']);

            if (isset($filters['user_id'])) {
                $query->where('user_id', $filters['user_id']);
            }

            if (isset($filters['assigned_to'])) {
                $query->where('assigned_to', $filters['assigned_to']);
            }

            if (isset($filters['unassigned']) && $filters['unassigned']) {
                $query->where('assigned_to', null);
            }

            if (isset($filters['status'])) {
                $query->where('status', $filters['status']);
            }

            if (isset($filters['priority'])) {
                $query->where('priority', $filters['priority']);
            }

            if (isset($filters['sort_by'])) {
                $query->orderBy($filters['sort_by'], $filters['sort_direction'] ?? 'asc');
            }

            $query->query(fn ($q) => $q->with(['user', 'agent']));

            return $query->paginate($perPage);
        }

        $query = Ticket::query()->with(['user', 'agent']);


        // O usuário padrão só pode ver os seus tickets

        if (isset($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        if (isset($filters['assigned_to'])) {
            $query->where('assigned_to', $filters['assigned_to']);
        }

        if (isset($filters['unassigned']) && $filters['unassigned']) {
            $query->whereNull('assigned_to');
        }

        // Filtro por status
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        // Filtro por prioridade
        if (isset($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        if (isset($filters['sort_by'])) {
            $query->orderBy($filters['sort_by'], $filters['sort_direction'] ?? 'asc');
        } else {
            $query->latest();
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

    public function getStats(array $filters = [])
    {
        $query = Ticket::query();

        if (isset($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        $total = $query->count();
        $open = $query->clone()->where('status', TicketStatus::OPEN->value)->count();
        $inProgress = $query->clone()->where('status', TicketStatus::IN_PROGRESS->value)->count();
        $closed = $query->clone()->where('status', TicketStatus::CLOSE->value)->count();

        return [
            'total' => $total,
            'open' => $open,
            'in_progress' => $inProgress,
            'closed' => $closed,
        ];
    }
}
