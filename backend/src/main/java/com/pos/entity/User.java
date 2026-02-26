package com.pos.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;
    
    @Column(name = "created_at")
    @Builder.Default
    private Long createdAt = System.currentTimeMillis();
    
    @Column(name = "updated_at")
    @Builder.Default
    private Long updatedAt = System.currentTimeMillis();
}
