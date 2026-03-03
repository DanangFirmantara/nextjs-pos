package com.pos.controller;

import com.pos.entity.MasterModule;
import com.pos.service.MasterModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/master-modules")
public class MasterModuleController {
    @Autowired
    private MasterModuleService service;

    @GetMapping
    public List<MasterModule> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public MasterModule getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public MasterModule create(@RequestBody MasterModule entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public MasterModule update(@PathVariable Integer id, @RequestBody MasterModule entity) {
        return service.updateFull(id, entity);
    }

    @PatchMapping("/{id}")
    public MasterModule partialUpdate(@PathVariable Integer id, @RequestBody MasterModule updates) {
        return service.updatePartial(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
