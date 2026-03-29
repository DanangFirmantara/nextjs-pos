package com.pos.repository;

import com.pos.entity.MasterReferensi;
import com.pos.dto.MasterReferensiDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MasterReferensiRepository extends JpaRepository<MasterReferensi, Integer> {
    @Query("""
        SELECT new com.pos.dto.MasterReferensiDto(mr.id, mr.vname) FROM MasterReferensi mr WHERE (:vdesc IS NULL OR mr.vdesc = :vdesc) and mr.bisDelete = false
    """)
    List<MasterReferensiDto> findByVdesc(@Param("vdesc") String vdesc);
    java.util.List<MasterReferensi> findAllByBisDeleteFalse(org.springframework.data.domain.Sort sort);
}