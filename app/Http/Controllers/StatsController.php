<?php

namespace App\Http\Controllers;

use App\Services\StatsService;
use Illuminate\Http\Request;

/**
 * @group Estatísticas
 *
 * Endpoints para visualizar estatísticas.
 */
class StatsController extends Controller
{
    public function __construct(
        protected StatsService $statsService
    ) {
    }

    /**
     * Exibe as estatísticas dos tickets.
     *
     * @authenticated
     */
    public function index(Request $request)
    {
        $stats = $this->statsService->getStats($request->all());
        return response()->json($stats);
    }
}
