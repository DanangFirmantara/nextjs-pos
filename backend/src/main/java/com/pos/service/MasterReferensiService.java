package com.pos.service;

import com.pos.entity.MasterReferensi;
import com.pos.dto.MasterReferensiDto;
import com.pos.repository.MasterReferensiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.domain.Sort;

@Service
public class MasterReferensiService {
    @Autowired
    private MasterReferensiRepository repository;

    public List<MasterReferensi> getAll() {
        return repository.findAllByBisDeleteFalse(Sort.by(Sort.Direction.ASC, "id"));
    }

    public MasterReferensi getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("MasterReferensi not found"));
    }

    public MasterReferensi create(MasterReferensi entity) {
        return repository.save(entity);
    }

    public MasterReferensi updatePartial(Integer id, MasterReferensi updates) {
        MasterReferensi existing = getById(id);

        if (updates.getVname() != null) {
            existing.setVname(updates.getVname());
        }
        if (updates.getVdesc() != null) {
            existing.setVdesc(updates.getVdesc());
        }
        if (updates.getBisDelete() != null) {
            existing.setBisDelete(updates.getBisDelete());
        }
        if (updates.getUpdatedBy() != null) {
            existing.setUpdatedBy(updates.getUpdatedBy());
        }

        return repository.save(existing);
    }

    public MasterReferensi updateFull(Integer id, MasterReferensi entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("MasterReferensi not found");
        }
        entity.setId(id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("MasterReferensi not found");
        }
        repository.deleteById(id);
    }

    public List<MasterReferensiDto> findByVdesc(String vdesc) {
        return repository.findByVdesc(vdesc);
    }
}