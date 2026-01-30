<?php

namespace App\Http\Controllers;

use App\Interfaces\ITicketRepository;
use Illuminate\Http\Request;

/**
 * @group Tickets
 *
 * Gerenciamento de tickets de suporte.
 */
class TicketController extends Controller
{
    public function __construct(
        protected ITicketRepository $ticketRepository
    ) {}

    /**
     * Listar Tickets
     *
     * Retorna uma lista paginada de tickets com base nos filtros fornecidos.
     *
     * @queryParam page int O número da página. Example: 1
     * @queryParam per_page int A quantidade de itens por página. Example: 10
     * @queryParam search string Termo de busca para filtrar tickets. Example: erro
     * @queryParam status string Filtra tickets pelo status. Example: open
     * @queryParam priority string Filtra tickets pela prioridade. Example: high
     */
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

    /**
     * Criar Ticket
     *
     * Cria um novo ticket de suporte.
     *
     * @bodyParam title string required O título do ticket. Example: Erro no login
     * @bodyParam description string required A descrição detalhada do problema. Example: Não consigo acessar minha conta.
     * @bodyParam priority string A prioridade do ticket (low, medium, high, critical). Example: high
     */
    public function store(Request $request)
    {
        return $this->ticketRepository->create($request->all());
    }

    /**
     * Exibir Ticket
     *
     * Retorna os detalhes de um ticket específico.
     *
     * @urlParam id string required O ID do ticket. Example: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
     */
    public function show(string $id)
    {
        return $this->ticketRepository->findById($id);
    }

    /**
     * Atualizar Ticket
     *
     * Atualiza as informações de um ticket existente.
     *
     * @urlParam id string required O ID do ticket. Example: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
     * @bodyParam title string O título do ticket. Example: Erro no login corrigido
     * @bodyParam description string A descrição detalhada do problema. Example: O erro persiste em alguns navegadores.
     * @bodyParam priority string A prioridade do ticket. Example: critical
     * @bodyParam status string O status do ticket. Example: in_progress
     */
    public function update(Request $request, string $id)
    {
        return $this->ticketRepository->update($id, $request->all());
    }

    /**
     * Deletar Ticket
     *
     * Remove um ticket do sistema.
     *
     * @urlParam id string required O ID do ticket. Example: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
     */
    public function destroy(string $id)
    {
        return $this->ticketRepository->delete($id);
    }

    /**
     * Atribuir Ticket
     *
     * Atribui um ticket a um usuário específico (agente).
     *
     * @urlParam ticket string required O ID do ticket. Example: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
     * @urlParam user string required O ID do usuário. Example: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
     */
    public function assign(string $ticket, string $user)
    {
        return $this->ticketRepository->update($ticket, ['assigned_to' => $user]);
    }

    /**
     * Alterar Status do Ticket
     *
     * Atualiza o status de um ticket.
     *
     * @urlParam ticket string required O ID do ticket. Example: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
     * @bodyParam status string required O novo status do ticket (open, in_progress, resolved, closed). Example: resolved
     */
    public function changeStatus(Request $request, string $ticket)
    {
        return $this->ticketRepository->update($ticket, ['status' => $request->input('status')]);
    }
}
