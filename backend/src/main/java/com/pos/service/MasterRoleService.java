package com.pos.service;

import com.pos.entity.MasterRole;
import com.pos.repository.MasterRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MasterRoleService {
    @Autowired
    private MasterRoleRepository repository;

    public List<MasterRole> getAll() {
        return repository.findAll();
    }

    public MasterRole getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("MasterRole not found"));
    }

    public MasterRole create(MasterRole entity) {
        return repository.save(entity);
    }

    public MasterRole updatePartial(Integer id, MasterRole updates) {
        MasterRole existing = getById(id);

        if (updates.getVname() != null) {
            existing.setVname(updates.getVname());
        }

        if (updates.getVdesc() != null) {
            existing.setVdesc(updates.getVdesc());
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

    public MasterRole updateFull(Integer id, MasterRole entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("MasterRole not found");
        }
        entity.setId(id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("MasterRole not found");
        }
        repository.deleteById(id);
    }
}