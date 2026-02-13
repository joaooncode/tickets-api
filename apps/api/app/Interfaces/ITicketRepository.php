<?php

namespace App\Interfaces;

interface ITicketRepository
{
    public  function  getAll(array $filters = [], int $perPage = 10);
    public  function  findById(string $id): \App\Http\Resources\TicketResource;
    public  function  create(array $data);
    public  function  update(string $id, array $data);
    public  function  delete(string $id);
    public  function  getStats(array $filters = []);
}
