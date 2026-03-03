package com.pos.repository;

import com.pos.entity.MasterRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterRoleRepository extends JpaRepository<MasterRole, Integer> {
}
