package com.pos.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrxMenuCreateRequest {
    private Integer itotalItem;
    private Long totalTransaksi;
    private Integer imetodePembayaran;
    private Integer ipic;
    private Integer createdBy;
    private List<TrxMenuDetailRequest> trxMenuDetail;

    // Manual getters for Java 26 compatibility
    public Integer getItotalItem() {
        return itotalItem;
    }
    public void setItotalItem(Integer itotalItem) {
        this.itotalItem = itotalItem;
    }
    public Long getTotalTransaksi() {
        return totalTransaksi;
    }
    public void setTotalTransaksi(Long totalTransaksi) {
        this.totalTransaksi = totalTransaksi;
    }
    public Integer getImetodePembayaran() {
        return imetodePembayaran;
    }
    public void setImetodePembayaran(Integer imetodePembayaran) {
        this.imetodePembayaran = imetodePembayaran;
    }
    public Integer getIpic() {
        return ipic;
    }
    public void setIpic(Integer ipic) {
        this.ipic = ipic;
    }
    public Integer getCreatedBy() {
        return createdBy;
    }
    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }
    public List<TrxMenuDetailRequest> getTrxMenuDetail() {
        return trxMenuDetail;
    }
    public void setTrxMenuDetail(List<TrxMenuDetailRequest> trxMenuDetail) {
        this.trxMenuDetail = trxMenuDetail;
    }
}
