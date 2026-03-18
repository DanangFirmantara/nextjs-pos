package com.pos.repository;

import com.pos.entity.MasterMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterMenuRepository extends JpaRepository<MasterMenu, Integer> {
}