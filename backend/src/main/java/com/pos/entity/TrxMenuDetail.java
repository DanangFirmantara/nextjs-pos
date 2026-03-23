package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "trx_menu_detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonPropertyOrder({"id", "guid", "createdAt", "createdBy", "updatedAt", "updatedBy", "idTrxMenu", "imenuId", "qty", "totalTransaksi", "bisDelete", "bisActive"})
public class TrxMenuDetail {
    
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

    @Column(name = "id_trx_menu", nullable = false)
    private Integer idTrxMenu;

    @Column(name = "imenu_id", nullable = false)
    private Integer imenuId;

    @Column(name = "qty", nullable = false)
    @Builder.Default
    private Integer qty = 1;

    @Column(name = "total_transaksi")
    @Builder.Default
    private Long totalTransaksi = 0L;

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
    public Integer getIdTrxMenu() {
        return idTrxMenu;
    }
    public void setIdTrxMenu(Integer idTrxMenu) {
        this.idTrxMenu = idTrxMenu;
    }
    public Integer getImenuId() {
        return imenuId;
    }
    public void setImenuId(Integer imenuId) {
        this.imenuId = imenuId;
    }
    public Integer getQty() {
        return qty;
    }
    public void setQty(Integer qty) {
        this.qty = qty;
    }
    public Long getTotalTransaksi() {
        return totalTransaksi;
    }
    public void setTotalTransaksi(Long totalTransaksi) {
        this.totalTransaksi = totalTransaksi;
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