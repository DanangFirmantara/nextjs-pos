package com.pos.controller;

import com.pos.entity.TrxMenuDetail;
import com.pos.service.TrxMenuDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trx-menu-details")
public class TrxMenuDetailController {
    @Autowired
    private TrxMenuDetailService service;

    @GetMapping
    public List<TrxMenuDetail> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public TrxMenuDetail getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public TrxMenuDetail create(@RequestBody TrxMenuDetail entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public TrxMenuDetail update(@PathVariable Integer id, @RequestBody TrxMenuDetail entity) {
        return service.updateFull(id, entity);
    }

    @PatchMapping("/{id}")
    public TrxMenuDetail partialUpdate(@PathVariable Integer id, @RequestBody TrxMenuDetail updates) {
        return service.updatePartial(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}