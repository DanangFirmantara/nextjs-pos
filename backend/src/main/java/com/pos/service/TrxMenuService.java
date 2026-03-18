package com.pos.service;

import com.pos.entity.TrxMenu;
import com.pos.repository.TrxMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TrxMenuService {
    @Autowired
    private TrxMenuRepository repository;

    public List<TrxMenu> getAll() {
        return repository.findAll();
    }

    public TrxMenu getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("TrxMenu not found"));
    }

    public TrxMenu create(TrxMenu entity) {
        return repository.save(entity);
    }

    public TrxMenu updatePartial(Integer id, TrxMenu updates) {
        TrxMenu existing = getById(id);

        if (updates.getVnoTransaksi() != null) {
            existing.setVnoTransaksi(updates.getVnoTransaksi());
        }
        if (updates.getDtglTransaksi() != null) {
            existing.setDtglTransaksi(updates.getDtglTransaksi());
        }
        if (updates.getItotalItem() != null) {
            existing.setItotalItem(updates.getItotalItem());
        }
        if (updates.getTotalTransaksi() != null) {
            existing.setTotalTransaksi(updates.getTotalTransaksi());
        }
        if (updates.getImetodePembayaran() != null) {
            existing.setImetodePembayaran(updates.getImetodePembayaran());
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

    public TrxMenu updateFull(Integer id, TrxMenu entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("TrxMenu not found");
        }
        entity.setId(id);
        return repository.save(entity);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("TrxMenu not found");
        }
        repository.deleteById(id);
    }
}