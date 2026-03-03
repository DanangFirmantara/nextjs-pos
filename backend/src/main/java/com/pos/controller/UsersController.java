package com.pos.controller;

import com.pos.entity.Users;
import com.pos.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping
    public List<Users> getAll() {
        return usersService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Users getById(@PathVariable Integer id) {
        return usersService.getUserById(id);
    }

    @PostMapping
    public Users create(@RequestBody Users user) {
        return usersService.createUser(user);
    }

    /**
     * Full update - update seluruh data user (kecuali id, guid)
     * PUT: Mengirim seluruh object, field yang tidak dikirim akan diabaikan
     */
    @PutMapping("/{id}")
    public Users update(@PathVariable Integer id, @RequestBody Users user) {
        return usersService.updateUserFull(id, user);
    }

    /**
     * Partial update - update hanya field yang dikirim
     * PATCH: Hanya field yang dikirim yang akan diupdate, field lain tetap
     * 
     * Contoh request body:
     * {
     *   "vusername": "new_username"
     * }
     * atau
     * {
     *   "vpassword": "new_password",
     *   "bisActive": false
     * }
     */
    @PatchMapping("/{id}")
    public Users partialUpdate(@PathVariable Integer id, @RequestBody Users updates) {
        return usersService.updateUserPartial(id, updates);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        usersService.deleteUser(id);
    }
}
