package com.pos.service;

import com.pos.entity.TrxMenu;
import com.pos.entity.TrxMenuDetail;
import com.pos.entity.MasterMenu;
import com.pos.repository.TrxMenuRepository;
import com.pos.repository.TrxMenuDetailRepository;
import com.pos.repository.MasterMenuRepository;
import com.pos.dto.TrxMenuCreateRequest;
import com.pos.dto.TrxMenuDetailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.data.domain.Sort;

@Service
public class TrxMenuService {
    @Autowired
    private TrxMenuRepository repository;

    @Autowired
    private TrxMenuDetailRepository detailRepository;

    @Autowired
    private MasterMenuRepository masterMenuRepository;

    public List<TrxMenu> getAll() {
        return repository.findAllByBisDeleteFalse(Sort.by(Sort.Direction.ASC, "id"));
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

    /**
     * Generate vno_transaksi dengan format {ddmmyy}-{lastCountTransaction}
     * @return Generated transaction number
     */
    private String generateVnoTransaksi() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("ddMMyy");
        String datePrefix = now.format(formatter);
        
        Integer lastCount = repository.countByVnoTransaksiPrefix(datePrefix);
        Integer nextCount = lastCount + 1;
        
        return datePrefix + "-" + String.format("%06d", nextCount);
    }

    /**
     * Create transaksi menu dengan detail items secara bertingkat
     * @param request TrxMenuCreateRequest containing menu and details
     * @return Created TrxMenu with id set
     */
    public TrxMenu createWithDetails(TrxMenuCreateRequest request) {
        // Generate vno_transaksi
        String vnoTransaksi = generateVnoTransaksi();
        
        // Create TrxMenu
        TrxMenu trxMenu = new TrxMenu();
        trxMenu.setVnoTransaksi(vnoTransaksi);
        trxMenu.setDtglTransaksi(Timestamp.valueOf(LocalDateTime.now()));
        trxMenu.setItotalItem(request.getItotalItem());
        trxMenu.setTotalTransaksi(request.getTotalTransaksi());
        trxMenu.setImetodePembayaran(request.getImetodePembayaran());
        trxMenu.setIpic(request.getIpic());
        trxMenu.setCreatedBy(request.getCreatedBy());
        trxMenu.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        trxMenu.setBisDelete(false);
        trxMenu.setBisActive(true);
        
        // Save TrxMenu first to get the generated ID
        TrxMenu savedMenu = repository.save(trxMenu);
        
        // Create TrxMenuDetail items dan update stock
        if (request.getTrxMenuDetail() != null && !request.getTrxMenuDetail().isEmpty()) {
            for (TrxMenuDetailRequest detail : request.getTrxMenuDetail()) {
                // Save TrxMenuDetail
                TrxMenuDetail trxMenuDetail = new TrxMenuDetail();
                trxMenuDetail.setIdTrxMenu(savedMenu.getId());
                trxMenuDetail.setImenuId(detail.getImenuId());
                trxMenuDetail.setQty(detail.getQty());
                trxMenuDetail.setTotalTransaksi(detail.getTotalTransaksi());
                trxMenuDetail.setCreatedBy(request.getCreatedBy());
                trxMenuDetail.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
                trxMenuDetail.setBisDelete(false);
                trxMenuDetail.setBisActive(true);
                
                detailRepository.save(trxMenuDetail);
                
                // Update stock dari MasterMenu
                MasterMenu masterMenu = masterMenuRepository.findById(detail.getImenuId())
                        .orElseThrow(() -> new RuntimeException("MasterMenu with id " + detail.getImenuId() + " not found"));
                
                // Kurangi stock sesuai qty yang digunakan
                Integer currentStock = masterMenu.getIstock() != null ? masterMenu.getIstock() : 0;
                Integer newStock = currentStock - detail.getQty();
                
                if (newStock < 0) {
                    throw new RuntimeException("Stock tidak cukup untuk item " + masterMenu.getVname() + 
                            ". Stock tersedia: " + currentStock + ", Qty yang diminta: " + detail.getQty());
                }
                
                masterMenu.setIstock(newStock);
                masterMenu.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
                masterMenu.setUpdatedBy(request.getCreatedBy());
                masterMenuRepository.save(masterMenu);
            }
        }
        
        return savedMenu;
    }
}