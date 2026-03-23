package com.pos.service;

import com.pos.entity.TrxMenuDetail;
import com.pos.repository.TrxMenuDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.data.domain.Sort;

@Service
public class TrxMenuDetailService {
    @Autowired
    private TrxMenuDetailRepository repository;

    public List<TrxMenuDetail> getAll() {
        return repository.findAllByBisDeleteFalse(Sort.by(Sort.Direction.ASC, "id"));
    }

    public TrxMenuDetail getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("TrxMenuDetail not found"));
    }

    public TrxMenuDetail create(TrxMenuDetail entity) {
        return repository.save(entity);
    }

    public TrxMenuDetail updatePartial(Integer id, TrxMenuDetail updates) {
        TrxMenuDetail existing = getById(id);

        if (updates.getIdTrxMenu() != null) {
            existing.setIdTrxMenu(updates.getIdTrxMenu());
        }
        if (updates.getImenuId() != null) {
            existing.setImenuId(updates.getImenuId());
        }
        if (updates.getQty() != null) {
            existing.setQty(updates.getQty());
        }
        if (updates.getTotalTransaksi() != null) {
            existing.setTotalTransaksi(updates.getTotalTransaksi());
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

    public TrxMenuDetail updateFull(Integer id, TrxMenuDetail entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("TrxMenuDetail not found");
        }
        entity.setId(id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("TrxMenuDetail not found");
        }
        repository.deleteById(id);
    }
}