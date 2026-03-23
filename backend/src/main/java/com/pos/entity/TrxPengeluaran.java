package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "trx_pengeluaran")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonPropertyOrder({"id", "guid", "createdAt", "createdBy", "updatedAt", "updatedBy", "dtglPengeluaran", "ikategory", "vdesc", "totalPengeluaran", "ipic", "bisDelete", "bisActive"})
public class TrxPengeluaran {
    
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

    @Column(name = "dtgl_pengeluaran")
    private Timestamp dtglPengeluaran;

    @Column(name = "ikategory")
    private Integer ikategory;

    @Column(name = "vdesc", length = 255)
    private String vdesc;

    @Column(name = "total_pengeluaran")
    @Builder.Default
    private Long totalPengeluaran = 0L;

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
    public Timestamp getDtglPengeluaran() {
        return dtglPengeluaran;
    }
    public void setDtglPengeluaran(Timestamp dtglPengeluaran) {
        this.dtglPengeluaran = dtglPengeluaran;
    }
    public Integer getIkategory() {
        return ikategory;
    }
    public void setIkategory(Integer ikategory) {
        this.ikategory = ikategory;
    }
    public String getVdesc() {
        return vdesc;
    }
    public void setVdesc(String vdesc) {
        this.vdesc = vdesc;
    }
    public Long getTotalPengeluaran() {
        return totalPengeluaran;
    }
    public void setTotalPengeluaran(Long totalPengeluaran) {
        this.totalPengeluaran = totalPengeluaran;
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