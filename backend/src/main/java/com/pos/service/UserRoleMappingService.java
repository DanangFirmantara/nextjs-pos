package com.pos.service;

import com.pos.entity.UserRoleMapping;
import com.pos.entity.MasterRole;
import com.pos.entity.Users;
import com.pos.repository.UserRoleMappingRepository;
import com.pos.repository.MasterRoleRepository;
import com.pos.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.domain.Sort;

@Service
public class UserRoleMappingService {
    @Autowired
    private UserRoleMappingRepository repository;

    @Autowired
    private MasterRoleRepository roleRepository;

    @Autowired
    private UsersRepository usersRepository;

    public List<UserRoleMapping> getAll() {
        return repository.findAllByBisDeleteFalse(Sort.by(Sort.Direction.ASC, "id"));
    }

    public UserRoleMapping getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("UserRoleMapping not found"));
    }

    public UserRoleMapping create(UserRoleMapping entity) {
        return repository.save(entity);
    }

    public UserRoleMapping updatePartial(Integer id, UserRoleMapping updates) {
        UserRoleMapping existing = getById(id);

        if (updates.getRole() != null && updates.getRole().getId() != null) {
            MasterRole role = roleRepository.findById(updates.getRole().getId())
                    .orElseThrow(() -> new RuntimeException("MasterRole not found"));
            existing.setRole(role);
        }

        if (updates.getUser() != null && updates.getUser().getId() != null) {
            Users user = usersRepository.findById(updates.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            existing.setUser(user);
        }

        if (updates.getBisDelete() != null) {
            existing.setBisDelete(updates.getBisDelete());
        }

        if (updates.getCreatedBy() != null) {
            existing.setCreatedBy(updates.getCreatedBy());
        }

        if (updates.getUpdatedBy() != null) {
            existing.setUpdatedBy(updates.getUpdatedBy());
        }

        return repository.save(existing);
    }

    public UserRoleMapping updateFull(Integer id, UserRoleMapping entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("UserRoleMapping not found");
        }
        entity.setId(id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("UserRoleMapping not found");
        }
        repository.deleteById(id);
    }
}