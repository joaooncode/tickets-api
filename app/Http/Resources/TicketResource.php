<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use UserResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'priority' => $this->priority,
            'created_at' => $this->created_at->toIso8601String(),
            // Carrega relacionamento apenas se disponível para economizar queries
            'requester' => new UserResource($this->whenLoaded('user')),
            'assigned_agent' => new UserResource($this->whenLoaded('agent')),
        ];
    }
}
