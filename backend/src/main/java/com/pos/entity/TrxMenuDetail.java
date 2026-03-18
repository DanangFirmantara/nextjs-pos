package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "trx_menu_detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}