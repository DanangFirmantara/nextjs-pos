package com.pos.controller;

import com.pos.entity.UserRoleMapping;
import com.pos.service.UserRoleMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-role-mappings")
public class UserRoleMappingController {
    @Autowired
    private UserRoleMappingService service;

    @GetMapping
    public List<UserRoleMapping> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public UserRoleMapping getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public UserRoleMapping create(@RequestBody UserRoleMapping entity) {
        return service.create(entity);
    }

    @PutMapping("/{id}")
    public UserRoleMapping update(@PathVariable Integer id, @RequestBody UserRoleMapping entity) {
        return service.updateFull(id, entity);
    }

    @PatchMapping("/{id}")
    public UserRoleMapping partialUpdate(@PathVariable Integer id, @RequestBody UserRoleMapping updates) {
        return service.updatePartial(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
