package com.pos.repository;

import com.pos.entity.RoleModuleMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleModuleMappingRepository extends JpaRepository<RoleModuleMapping, Integer> {
}
