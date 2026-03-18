package com.pos.service;

import com.pos.entity.MasterMenu;
import com.pos.repository.MasterMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MasterMenuService {
    @Autowired
    private MasterMenuRepository repository;

    public List<MasterMenu> getAll() {
        return repository.findAll();
    }

    public MasterMenu getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("MasterMenu not found"));
    }

    public MasterMenu create(MasterMenu entity) {
        return repository.save(entity);
    }

    public MasterMenu updatePartial(Integer id, MasterMenu updates) {
        MasterMenu existing = getById(id);

        if (updates.getVname() != null) {
            existing.setVname(updates.getVname());
        }
        if (updates.getVdesc() != null) {
            existing.setVdesc(updates.getVdesc());
        }
        if (updates.getIkategory() != null) {
            existing.setIkategory(updates.getIkategory());
        }
        if (updates.getKodeBarang() != null) {
            existing.setKodeBarang(updates.getKodeBarang());
        }
        if (updates.getIjenisSatuan() != null) {
            existing.setIjenisSatuan(updates.getIjenisSatuan());
        }
        if (updates.getHargaJual() != null) {
            existing.setHargaJual(updates.getHargaJual());
        }
        if (updates.getHargaBeli() != null) {
            existing.setHargaBeli(updates.getHargaBeli());
        }
        if (updates.getIstock() != null) {
            existing.setIstock(updates.getIstock());
        }
        if (updates.getIminStock() != null) {
            existing.setIminStock(updates.getIminStock());
        }
        if (updates.getFileName() != null) {
            existing.setFileName(updates.getFileName());
        }
        if (updates.getFileType() != null) {
            existing.setFileType(updates.getFileType());
        }
        if (updates.getFilePath() != null) {
            existing.setFilePath(updates.getFilePath());
        }
        if (updates.getBisDelete() != null) {
            existing.setBisDelete(updates.getBisDelete());
        }
        if (updates.getBisActive() != null) {
            existing.setBisActive(updates.getBisActive());
        }
        if (updates.getUpdatedBy() != null) {
            existing.setUpdatedBy(updates.getUpdatedBy());
        }

        return repository.save(existing);
    }

    public MasterMenu updateFull(Integer id, MasterMenu entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("MasterMenu not found");
        }
        entity.setId(id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("MasterMenu not found");
        }
        repository.deleteById(id);
    }
}