package com.pos.controller;

import com.pos.service.HealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {
    @Autowired
    private HealthService healthService;

    /**
     * Simple health check
     * GET /api/health
     */
    @GetMapping
    public Map<String, Object> health() {
        return healthService.getHealthStatus();
    }

    /**
     * Detailed health check with system info
     * GET /api/health/detail
     */
    @GetMapping("/detail")
    public Map<String, Object> healthDetail() {
        return healthService.getDetailedHealth();
    }

    /**
     * Simple ping endpoint
     * GET /api/health/ping
     */
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}