package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "trx_menu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}