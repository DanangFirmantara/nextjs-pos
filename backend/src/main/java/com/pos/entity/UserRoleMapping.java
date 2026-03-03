package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "user_role_mapping")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRoleMapping {
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
    @JoinColumn(name = "iuser_id", nullable = false)
    private Users user;

    @Column(name = "bis_delete")
    @Builder.Default
    private Boolean bisDelete = false;

    @PrePersist
    protected void onCreate() {
        if (this.guid == null) {
            this.guid = UUID.randomUUID();
        }
    }
}
