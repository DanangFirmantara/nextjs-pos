package com.pos.service;

import com.pos.entity.Users;
import com.pos.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public Users getUserById(Integer id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Users createUser(Users user) {
        return usersRepository.save(user);
    }

    public Users updateUserPartial(Integer id, Users updates) {
        Users existingUser = getUserById(id);

        if (updates.getVusername() != null) {
            existingUser.setVusername(updates.getVusername());
        }

        if (updates.getVpassword() != null) {
            existingUser.setVpassword(updates.getVpassword());
        }

        if (updates.getBisActive() != null) {
            existingUser.setBisActive(updates.getBisActive());
        }

        if (updates.getBisDelete() != null) {
            existingUser.setBisDelete(updates.getBisDelete());
        }

        if (updates.getCreatedBy() != null) {
            existingUser.setCreatedBy(updates.getCreatedBy());
        }

        if (updates.getUpdatedBy() != null) {
            existingUser.setUpdatedBy(updates.getUpdatedBy());
        }

        return usersRepository.save(existingUser);
    }

    public Users updateUserFull(Integer id, Users user) {
        if (!usersRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        user.setId(id);
        return usersRepository.save(user);
    }

    public void deleteUser(Integer id) {
        if (!usersRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        usersRepository.deleteById(id);
    }

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }
}