package com.pos.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class HealthService {

    public Map<String, Object> getHealthStatus() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("message", "Backend is running well");
        health.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        health.put("application", "POS Backend");
        health.put("version", "1.0.0");
        return health;
    }

    public Map<String, Object> getDetailedHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("message", "Backend is running well");
        health.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        health.put("application", "POS Backend");
        health.put("version", "1.0.0");
        
        // System info
        Map<String, Object> system = new HashMap<>();
        system.put("javaVersion", System.getProperty("java.version"));
        system.put("osName", System.getProperty("os.name"));
        system.put("osArch", System.getProperty("os.arch"));
        system.put("availableProcessors", Runtime.getRuntime().availableProcessors());
        system.put("freeMemoryMB", Runtime.getRuntime().freeMemory() / (1024 * 1024));
        system.put("totalMemoryMB", Runtime.getRuntime().totalMemory() / (1024 * 1024));
        system.put("maxMemoryMB", Runtime.getRuntime().maxMemory() / (1024 * 1024));
        health.put("system", system);

        return health;
    }
}