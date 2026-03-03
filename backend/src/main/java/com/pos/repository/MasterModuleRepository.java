package com.pos.repository;

import com.pos.entity.MasterModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterModuleRepository extends JpaRepository<MasterModule, Integer> {
}
