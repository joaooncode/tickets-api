<?php

namespace App\Services;

use App\Enums\TicketStatus;
use App\Interfaces\ITicketRepository;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\UnauthorizedException;

class TicketService
{
    public function __construct(
        protected ITicketRepository $ticketRepository
    ) {
    }

    public function listTickets(array $filters)
    {
        $user = Auth::user();

        if (!$user->isAdmin) {
            $filters['user_id'] = $user->id;
        }

        return $this->ticketRepository->getAll($filters);
    }

    public function createTicket(array $data)
    {
        $data['user_id'] = Auth::id();
        $data['status'] = TicketStatus::OPEN->value;

        return $this->ticketRepository->create($data);
    }

    public function updateTicket(string $id, array $data)
    {
        return $this->ticketRepository->update($id, $data);
    }

    public function findTicket(string $id)
    {
        return $this->ticketRepository->findById($id);
    }

    public function deleteTicket(string $id)
    {
        return $this->ticketRepository->delete($id);
    }

    public function assignTicket(string $ticketId, string $userId)
    {
        $user = User::find($userId);

        if (!$user || !$user->isAdmin) {
            throw new UnauthorizedException('Only admin users can be assigned to tickets.');
        }

        return $this->ticketRepository->update($ticketId, ['assigned_to' => $userId]);
    }

    public function changeTicketStatus(string $ticketId, string $status)
    {
        $user = Auth::user();

        if (!$user->isAdmin) {
            throw new UnauthorizedException('Only admin users can change ticket status.');
        }

        return $this->ticketRepository->update($ticketId, ['status' => $status]);
    }
}
