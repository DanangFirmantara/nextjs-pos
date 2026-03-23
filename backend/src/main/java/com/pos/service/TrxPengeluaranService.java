package com.pos.service;

import com.pos.entity.TrxPengeluaran;
import com.pos.repository.TrxPengeluaranRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.domain.Sort;

@Service
public class TrxPengeluaranService {
    @Autowired
    private TrxPengeluaranRepository repository;

    public List<TrxPengeluaran> getAll() {
        return repository.findAllByBisDeleteFalse(Sort.by(Sort.Direction.ASC, "id"));
    }

    public TrxPengeluaran getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("TrxPengeluaran not found"));
    }

    public TrxPengeluaran create(TrxPengeluaran entity) {
        return repository.save(entity);
    }

    public TrxPengeluaran updatePartial(Integer id, TrxPengeluaran updates) {
        TrxPengeluaran existing = getById(id);

        if (updates.getDtglPengeluaran() != null) {
            existing.setDtglPengeluaran(updates.getDtglPengeluaran());
        }
        if (updates.getIkategory() != null) {
            existing.setIkategory(updates.getIkategory());
        }
        if (updates.getVdesc() != null) {
            existing.setVdesc(updates.getVdesc());
        }
        if (updates.getTotalPengeluaran() != null) {
            existing.setTotalPengeluaran(updates.getTotalPengeluaran());
        }
        if (updates.getIpic() != null) {
            existing.setIpic(updates.getIpic());
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

    public TrxPengeluaran updateFull(Integer id, TrxPengeluaran entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("TrxPengeluaran not found");
        }
        entity.setId(id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("TrxPengeluaran not found");
        }
        repository.deleteById(id);
    }
}