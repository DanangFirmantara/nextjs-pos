package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "role_module_mapping")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonPropertyOrder({"id", "guid", "createdAt", "createdBy", "updatedAt", "updatedBy", "role", "module", "bisDelete"})
public class RoleModuleMapping {
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "irole_id", nullable = false)
    private MasterRole role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "imodule_id", nullable = false)
    private MasterModule module;

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
    public MasterRole getRole() {
        return role;
    }
    public void setRole(MasterRole role) {
        this.role = role;
    }
    public MasterModule getModule() {
        return module;
    }
    public void setModule(MasterModule module) {
        this.module = module;
    }
    public Boolean getBisDelete() {
        return bisDelete;
    }
    public void setBisDelete(Boolean bisDelete) {
        this.bisDelete = bisDelete;
    }
}
