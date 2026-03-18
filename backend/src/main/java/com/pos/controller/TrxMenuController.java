package com.pos.controller;

import com.pos.entity.TrxMenu;
import com.pos.service.TrxMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trx-menus")
public class TrxMenuController {
    @Autowired
    private TrxMenuService service;

    @GetMapping
    public List<TrxMenu> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public TrxMenu getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public TrxMenu create(@RequestBody TrxMenu entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public TrxMenu update(@PathVariable Integer id, @RequestBody TrxMenu entity) {
        return service.updateFull(id, entity);
    }

    @PatchMapping("/{id}")
    public TrxMenu partialUpdate(@PathVariable Integer id, @RequestBody TrxMenu updates) {
        return service.updatePartial(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}