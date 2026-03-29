package com.pos.dto;

// import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
// @AllArgsConstructor
@Builder
public class MasterReferensiDto {
    private Integer id;
    private String vname;

    public MasterReferensiDto(Integer id, String vname) {
        this.id = id;
        this.vname = vname;
    }   

    // Manual getters/setters for Java 26 compatibility
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVname() {
        return vname;
    }

    public void setVname(String vname) {
        this.vname = vname;
    }
}