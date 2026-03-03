package com.pos.service;

import com.pos.entity.MasterModule;
import com.pos.repository.MasterModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MasterModuleService {
    @Autowired
    private MasterModuleRepository repository;

    public List<MasterModule> getAll() {
        return repository.findAll();
    }

    public MasterModule getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("MasterModule not found"));
    }

    public MasterModule create(MasterModule entity) {
        return repository.save(entity);
    }

    public MasterModule updatePartial(Integer id, MasterModule updates) {
        MasterModule existing = getById(id);

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

    public MasterModule updateFull(Integer id, MasterModule entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("MasterModule not found");
        }
        entity.setId(id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("MasterModule not found");
        }
        repository.deleteById(id);
    }
}