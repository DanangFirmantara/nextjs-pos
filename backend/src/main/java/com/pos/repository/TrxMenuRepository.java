package com.pos.repository;

import com.pos.entity.TrxMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrxMenuRepository extends JpaRepository<TrxMenu, Integer> {
}