package com.pos.repository;

import com.pos.entity.TrxMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TrxMenuRepository extends JpaRepository<TrxMenu, Integer> {
	java.util.List<TrxMenu> findAllByBisDeleteFalse(org.springframework.data.domain.Sort sort);
	
	@Query("SELECT COUNT(t) FROM TrxMenu t WHERE t.vnoTransaksi LIKE :prefix% AND t.bisDelete = false")
	Integer countByVnoTransaksiPrefix(@Param("prefix") String prefix);
}