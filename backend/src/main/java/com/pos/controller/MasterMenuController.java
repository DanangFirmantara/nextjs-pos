package com.pos.controller;

import com.pos.entity.MasterMenu;
import com.pos.service.MasterMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/master-menus")
public class MasterMenuController {
    @Autowired
    private MasterMenuService service;

    @GetMapping
    public List<MasterMenu> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public MasterMenu getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public MasterMenu create(@RequestBody MasterMenu entity) {
        return service.create(entity);
    }

    // @PutMapping("/{id}")
    // public MasterMenu update(@PathVariable Integer id, @RequestBody MasterMenu entity) {
    //     return service.updateFull(id, entity);
    // }

    @PostMapping("/{id}")
    public MasterMenu partialUpdate(@PathVariable Integer id, @RequestBody MasterMenu updates) {
        return service.updatePartial(id, updates);
    }

    // @DeleteMapping("/{id}")
    // public void delete(@PathVariable Integer id) {
    //     service.delete(id);
    // }
}