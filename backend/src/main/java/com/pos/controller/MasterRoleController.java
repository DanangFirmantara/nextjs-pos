package com.pos.controller;

import com.pos.entity.MasterRole;
import com.pos.service.MasterRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/master-roles")
public class MasterRoleController {
    @Autowired
    private MasterRoleService service;

    @GetMapping
    public List<MasterRole> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public MasterRole getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public MasterRole create(@RequestBody MasterRole entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public MasterRole update(@PathVariable Integer id, @RequestBody MasterRole entity) {
        return service.updateFull(id, entity);
    }

    @PatchMapping("/{id}")
    public MasterRole partialUpdate(@PathVariable Integer id, @RequestBody MasterRole updates) {
        return service.updatePartial(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
