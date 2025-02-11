package com.project.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.backend.models.Users;

import jakarta.transaction.Transactional;

public interface UserRepository extends JpaRepository<Users, Long> {

  @Modifying
  @Transactional
  @Query("""
      DELETE Users u
      where u.id = :id
      """)
  int deleteUserById(@Param(value = "id") Long id);

  Optional<Users> findByUsername(String username);
}
