package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "master_module")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonPropertyOrder({"id", "guid", "createdAt", "createdBy", "updatedAt", "updatedBy", "vname", "vdesc", "bisDelete"})
public class MasterModule {
    
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

    @Column(name = "vname", length = 100, nullable = false)
    private String vname;

    @Column(name = "vdesc", length = 255)
    private String vdesc;

    @Column(name = "bis_delete")
    @Builder.Default
    private Boolean bisDelete = false;

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
    public String getVname() {
        return vname;
    }
    public void setVname(String vname) {
        this.vname = vname;
    }
    public String getVdesc() {
        return vdesc;
    }
    public void setVdesc(String vdesc) {
        this.vdesc = vdesc;
    }
    public Boolean getBisDelete() {
        return bisDelete;
    }
    public void setBisDelete(Boolean bisDelete) {
        this.bisDelete = bisDelete;
    }
}
