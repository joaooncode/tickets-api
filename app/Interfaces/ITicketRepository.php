<?php

namespace App\Interfaces;

interface ITicketRepository
{
    public  function  getAll(array $filters = [], int $perPage = 10);
    public  function  findById(string $id);
    public  function  create(array $data);
    public  function  update(string $id, array $data);
    public  function  delete(string $id);
}
