package com.pos;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.pos"})
public class PosBackendApplication {

    public static void main(String[] args) {
        // Load .env file
        Dotenv dotenv = Dotenv.configure()
                .directory(".")
                .ignoreIfMissing()
                .load();
        
        // Set environment variables as system properties
        dotenv.entries().forEach(entry -> 
            System.setProperty(entry.getKey(), entry.getValue())
        );
        
        SpringApplication.run(PosBackendApplication.class, args);
    }

}
