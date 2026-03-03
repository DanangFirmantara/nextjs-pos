package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {
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

    @Column(name = "vusername", length = 100, nullable = false)
    private String vusername;

    @Column(name = "vpassword", length = 255)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private String vpassword;

    @Column(name = "bis_active")
    @Builder.Default
    private Boolean bisActive = true;

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
