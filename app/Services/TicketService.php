<?php

namespace App\Services;

class TicketService
{
    public function __construct(
    protected TicketRepositoryInterface $ticketRepository
) {}

    public function listTickets(array $filters)
{
    // Regra de Negócio: Se não for admin/agente, força o filtro pelo ID do usuário logado
    $user = Auth::user();

    // Supondo que você tenha um método isAdmin() ou check na role
    if ($user->role === 'client') {
        $filters['user_id'] = $user->id;
    }

    return $this->ticketRepository->getAll($filters);
}

    public function createTicket(array $data)
{
    // Força o ID do usuário logado e status inicial
    $data['user_id'] = Auth::id();
    $data['status'] = TicketStatus::OPEN->value;

    return $this->ticketRepository->create($data);
}

    public function updateTicket(string $id, array $data)
{
    // Aqui você poderia colocar validações extras de status (Ex: Não reabrir ticket fechado há 30 dias)
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
}
