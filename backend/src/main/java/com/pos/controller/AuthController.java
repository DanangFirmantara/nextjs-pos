package com.pos.controller;

import com.pos.dto.LoginRequest;
import com.pos.dto.LoginResponse;
import com.pos.service.AuthService;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.hibernate.engine.jdbc.env.internal.LobCreationLogging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        logger.info("render here");
        logger.info("POST /auth/login called with email: {}", request.getEmail());
        LoginResponse response = authService.login(request);
        logger.info("Login response: {}", response);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        logger.info("POST /auth/logout called");
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        logger.info("GET /auth/health called");
        return ResponseEntity.ok("Backend is running");
    }
}
