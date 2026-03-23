package com.pos.repository;

import com.pos.entity.UserRoleMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleMappingRepository extends JpaRepository<UserRoleMapping, Integer> {
	java.util.List<UserRoleMapping> findAllByBisDeleteFalse(org.springframework.data.domain.Sort sort);
}
