package com.pos.controller;

import com.pos.entity.TrxPengeluaran;
import com.pos.service.TrxPengeluaranService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trx-pengeluarans")
public class TrxPengeluaranController {
    @Autowired
    private TrxPengeluaranService service;

    @GetMapping
    public List<TrxPengeluaran> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public TrxPengeluaran getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public TrxPengeluaran create(@RequestBody TrxPengeluaran entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public TrxPengeluaran update(@PathVariable Integer id, @RequestBody TrxPengeluaran entity) {
        return service.updateFull(id, entity);
    }

    @PatchMapping("/{id}")
    public TrxPengeluaran partialUpdate(@PathVariable Integer id, @RequestBody TrxPengeluaran updates) {
        return service.updatePartial(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}