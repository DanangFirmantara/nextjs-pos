package com.pos.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    
    private String token;
    private String message;
    private Boolean success;
    
    public LoginResponse(String token, String message) {
        this.token = token;
        this.message = message;
        this.success = true;
    }
}
