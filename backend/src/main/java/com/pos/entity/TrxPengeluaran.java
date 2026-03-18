package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "trx_pengeluaran")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}