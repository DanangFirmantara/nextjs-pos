package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "master_menu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MasterMenu {
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

    @Column(name = "vname", length = 150, nullable = false)
    private String vname;

    @Column(name = "vdesc", length = 255)
    private String vdesc;

    @Column(name = "ikategory")
    private Integer ikategory;

    @Column(name = "kode_barang", length = 50)
    private String kodeBarang;

    @Column(name = "ijenis_satuan")
    private Integer ijenisSatuan;

    @Column(name = "harga_jual")
    @Builder.Default
    private Long hargaJual = 0L;

    @Column(name = "harga_beli")
    private Long hargaBeli;

    @Column(name = "istock")
    private Integer istock;

    @Column(name = "imin_stock")
    private Integer iminStock;

    @Column(name = "file_name", length = 255)
    private String fileName;

    @Column(name = "file_type", length = 100)
    private String fileType;

    @Column(name = "file_path", length = 500)
    private String filePath;

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