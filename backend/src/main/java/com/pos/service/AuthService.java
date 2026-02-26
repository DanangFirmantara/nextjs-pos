package com.pos.service;

import com.pos.dto.LoginRequest;
import com.pos.dto.LoginResponse;
import com.pos.entity.User;
import com.pos.repository.UserRepository;

import javax.swing.plaf.basic.BasicInternalFrameTitlePane.SystemMenuBar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {
        logger.info("AuthService.login called with email: {}", request.getEmail());
        // TODO: Implement actual authentication logic
        // Simulasi response
        LoginResponse response = LoginResponse.builder()
            .token("sample-jwt-token")
            .message("Login successful")
            .build();
        logger.info("Returning LoginResponse: {}", response);
        return response;
    }

    public Boolean register(User user) {
        // TODO: Implement registration logic
        return false;
    }
}
