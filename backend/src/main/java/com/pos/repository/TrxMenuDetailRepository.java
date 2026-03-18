package com.pos.repository;

import com.pos.entity.TrxMenuDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrxMenuDetailRepository extends JpaRepository<TrxMenuDetail, Integer> {
}