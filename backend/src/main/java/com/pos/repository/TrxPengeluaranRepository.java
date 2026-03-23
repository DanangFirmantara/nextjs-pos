package com.pos.repository;

import com.pos.entity.TrxPengeluaran;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrxPengeluaranRepository extends JpaRepository<TrxPengeluaran, Integer> {
	java.util.List<TrxPengeluaran> findAllByBisDeleteFalse(org.springframework.data.domain.Sort sort);
}