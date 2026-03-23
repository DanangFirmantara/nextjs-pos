package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "trx_menu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonPropertyOrder({"id", "guid", "createdAt", "createdBy", "updatedAt", "updatedBy", "vnoTransaksi", "dtglTransaksi", "itotalItem", "totalTransaksi", "imetodePembayaran", "ipic", "bisDelete", "bisActive"})
public class TrxMenu {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private UUID guid;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "updated_by")
    private Integer updatedBy;

    @Column(name = "vno_transaksi", length = 100, nullable = false)
    private String vnoTransaksi;

    @Column(name = "dtgl_transaksi")
    private Timestamp dtglTransaksi;

    @Column(name = "itotal_item")
    @Builder.Default
    private Integer itotalItem = 0;

    @Column(name = "total_transaksi")
    @Builder.Default
    private Long totalTransaksi = 0L;

    @Column(name = "imetode_pembayaran")
    private Integer imetodePembayaran;

    @Column(name = "ipic")
    private Integer ipic;

    @Column(name = "bis_delete")
    @Builder.Default
    private Boolean bisDelete = false;

    @Column(name = "bis_active")
    @Builder.Default
    private Boolean bisActive = true;

    @PrePersist
    protected void onCreate() {
        if (this.guid == null) {
            this.guid = UUID.randomUUID();
        }
    }

    // Manual getter/setter for Java 26 compatibility
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public UUID getGuid() {
        return guid;
    }
    public void setGuid(UUID guid) {
        this.guid = guid;
    }
    public Timestamp getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
    public Integer getCreatedBy() {
        return createdBy;
    }
    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }
    public Timestamp getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
    public Integer getUpdatedBy() {
        return updatedBy;
    }
    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }
    public String getVnoTransaksi() {
        return vnoTransaksi;
    }
    public void setVnoTransaksi(String vnoTransaksi) {
        this.vnoTransaksi = vnoTransaksi;
    }
    public Timestamp getDtglTransaksi() {
        return dtglTransaksi;
    }
    public void setDtglTransaksi(Timestamp dtglTransaksi) {
        this.dtglTransaksi = dtglTransaksi;
    }
    public Integer getItotalItem() {
        return itotalItem;
    }
    public void setItotalItem(Integer itotalItem) {
        this.itotalItem = itotalItem;
    }
    public Long getTotalTransaksi() {
        return totalTransaksi;
    }
    public void setTotalTransaksi(Long totalTransaksi) {
        this.totalTransaksi = totalTransaksi;
    }
    public Integer getImetodePembayaran() {
        return imetodePembayaran;
    }
    public void setImetodePembayaran(Integer imetodePembayaran) {
        this.imetodePembayaran = imetodePembayaran;
    }
    public Integer getIpic() {
        return ipic;
    }
    public void setIpic(Integer ipic) {
        this.ipic = ipic;
    }
    public Boolean getBisDelete() {
        return bisDelete;
    }
    public void setBisDelete(Boolean bisDelete) {
        this.bisDelete = bisDelete;
    }
    public Boolean getBisActive() {
        return bisActive;
    }
    public void setBisActive(Boolean bisActive) {
        this.bisActive = bisActive;
    }
}