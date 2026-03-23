package com.pos.service;

import com.pos.entity.MasterMenu;
import com.pos.repository.MasterMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.domain.Sort;

@Service
public class MasterMenuService {
    @Autowired
    private MasterMenuRepository repository;

    public List<MasterMenu> getAll() {
        return repository.findAllByBisDeleteFalse(Sort.by(Sort.Direction.ASC, "id"));
    }

    public MasterMenu getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("MasterMenu not found"));
    }

    public MasterMenu create(MasterMenu entity) {
        // Generate kode_barang otomatis
        MasterMenu lastMenu = repository.findTopByOrderByIdDesc();
        int nextNumber = 1;
        if (lastMenu != null && lastMenu.getKodeBarang() != null && lastMenu.getKodeBarang().startsWith("BRG-")) {
            try {
                String lastNumberStr = lastMenu.getKodeBarang().substring(4);
                nextNumber = Integer.parseInt(lastNumberStr) + 1;
            } catch (Exception ignored) {}
        }
        String kodeBarangBaru = String.format("BRG-%05d", nextNumber);
        entity.setKodeBarang(kodeBarangBaru);
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