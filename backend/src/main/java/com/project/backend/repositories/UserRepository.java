package com.project.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.backend.eums.Role;
import com.project.backend.models.Users;

public interface UserRepository extends JpaRepository<Users, Long>,
    JpaSpecificationExecutor<Users> {

  @Modifying
  @Query("""
    DELETE FROM Users u
    where u.id = :id
    """)
  int deleteUserById(@Param(value = "id") Long id);

  // NOTE: use upper case when refering to entity names here
  @Query("""
    SELECT u FROM Users u
    where u.role = :role
    """)
  List<Users> findByRole(@Param(value = "role") Role role);

}
