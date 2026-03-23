package com.pos.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrxMenuDetailRequest {
    private Integer imenuId;
    private Integer qty;
    private Long totalTransaksi;

    // Manual getters for Java 26 compatibility
    public Integer getImenuId() {
        return imenuId;
    }
    public void setImenuId(Integer imenuId) {
        this.imenuId = imenuId;
    }
    public Integer getQty() {
        return qty;
    }
    public void setQty(Integer qty) {
        this.qty = qty;
    }
    public Long getTotalTransaksi() {
        return totalTransaksi;
    }
    public void setTotalTransaksi(Long totalTransaksi) {
        this.totalTransaksi = totalTransaksi;
    }
}
