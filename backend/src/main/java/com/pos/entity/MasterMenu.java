// File sudah dibersihkan dari duplikasi di luar deklarasi class
package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "master_menu")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonPropertyOrder({"id", "guid", "createdAt", "createdBy", "updatedAt", "updatedBy", "vname", "vdesc", "ikategory", "kodeBarang", "ijenisSatuan", "hargaJual", "hargaBeli", "istock", "iminStock", "fileName", "fileType", "filePath", "bisDelete", "bisActive"})
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

    // Manual getter/setter untuk workaround error Lombok di Java 26
    public String getKodeBarang() {
        return kodeBarang;
    }
    public void setKodeBarang(String kodeBarang) {
        this.kodeBarang = kodeBarang;
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
    public Integer getIkategory() {
        return ikategory;
    }
    public void setIkategory(Integer ikategory) {
        this.ikategory = ikategory;
    }
    public Integer getIjenisSatuan() {
        return ijenisSatuan;
    }
    public void setIjenisSatuan(Integer ijenisSatuan) {
        this.ijenisSatuan = ijenisSatuan;
    }
    public Long getHargaJual() {
        return hargaJual;
    }
    public void setHargaJual(Long hargaJual) {
        this.hargaJual = hargaJual;
    }
    public Long getHargaBeli() {
        return hargaBeli;
    }
    public void setHargaBeli(Long hargaBeli) {
        this.hargaBeli = hargaBeli;
    }
    public Integer getIstock() {
        return istock;
    }
    public void setIstock(Integer istock) {
        this.istock = istock;
    }
    public Integer getIminStock() {
        return iminStock;
    }
    public void setIminStock(Integer iminStock) {
        this.iminStock = iminStock;
    }
    public String getFileName() {
        return fileName;
    }
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    public String getFileType() {
        return fileType;
    }
    public void setFileType(String fileType) {
        this.fileType = fileType;
    }
    public String getFilePath() {
        return filePath;
    }
    public void setFilePath(String filePath) {
        this.filePath = filePath;
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
    public Integer getUpdatedBy() {
        return updatedBy;
    }
    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }
    public Timestamp getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
}