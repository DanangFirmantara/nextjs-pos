package com.pos.service;

import com.pos.entity.RoleModuleMapping;
import com.pos.entity.MasterRole;
import com.pos.entity.MasterModule;
import com.pos.repository.RoleModuleMappingRepository;
import com.pos.repository.MasterRoleRepository;
import com.pos.repository.MasterModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoleModuleMappingService {
    @Autowired
    private RoleModuleMappingRepository repository;

    @Autowired
    private MasterRoleRepository roleRepository;

    @Autowired
    private MasterModuleRepository moduleRepository;

    public List<RoleModuleMapping> getAll() {
        return repository.findAll();
    }

    public RoleModuleMapping getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("RoleModuleMapping not found"));
    }

    public RoleModuleMapping create(RoleModuleMapping entity) {
        return repository.save(entity);
    }

    public RoleModuleMapping updatePartial(Integer id, RoleModuleMapping updates) {
        RoleModuleMapping existing = getById(id);

        if (updates.getRole() != null && updates.getRole().getId() != null) {
            MasterRole role = roleRepository.findById(updates.getRole().getId())
                    .orElseThrow(() -> new RuntimeException("MasterRole not found"));
            existing.setRole(role);
        }

        if (updates.getModule() != null && updates.getModule().getId() != null) {
            MasterModule module = moduleRepository.findById(updates.getModule().getId())
                    .orElseThrow(() -> new RuntimeException("MasterModule not found"));
            existing.setModule(module);
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

    public RoleModuleMapping updateFull(Integer id, RoleModuleMapping entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("RoleModuleMapping not found");
        }
        entity.setId(id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("RoleModuleMapping not found");
        }
        repository.deleteById(id);
    }
}