package com.pos.controller;

import com.pos.entity.RoleModuleMapping;
import com.pos.service.RoleModuleMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/role-module-mappings")
public class RoleModuleMappingController {
    @Autowired
    private RoleModuleMappingService service;

    @GetMapping
    public List<RoleModuleMapping> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public RoleModuleMapping getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public RoleModuleMapping create(@RequestBody RoleModuleMapping entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public RoleModuleMapping update(@PathVariable Integer id, @RequestBody RoleModuleMapping entity) {
        return service.updateFull(id, entity);
    }

    @PatchMapping("/{id}")
    public RoleModuleMapping partialUpdate(@PathVariable Integer id, @RequestBody RoleModuleMapping updates) {
        return service.updatePartial(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
