<?php

namespace App\Services;

use App\Interfaces\ITicketRepository;

class StatsService
{
    public function __construct(
        protected ITicketRepository $ticketRepository
    ) {
    }

    public function getStats(array $filters)
    {
        return $this->ticketRepository->getStats($filters);
    }
}
