package com.project.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.backend.DTOs.UserDTO;
import com.project.backend.eums.Role;
import com.project.backend.models.Users;

public interface UserRepository extends JpaRepository<Users, Long>,
    JpaSpecificationExecutor<Users> {

  @Modifying
  @Query("delete User u where u.id = :id")
  int deleteUserById(@Param(value = "id") Long id);

  @Query("""
      SELECT firstName, lastName, emailAddress from users
      where role = 'USER'
      """)
  List<UserDTO> findByRole(Role role);

}
