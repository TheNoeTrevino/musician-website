package com.project.backend.repositories;

import com.project.backend.models.Piece;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PiecesRepository
    extends JpaRepository<Piece, Long>, JpaSpecificationExecutor<Piece> {

  @Modifying
  @Query(
      """
      DELETE FROM Piece p
      where p.id = :id
      """)
  int deletePieceById(@Param(value = "id") Long id);

  @Query("SELECT p FROM Piece p WHERE p.productId = :productId")
  Optional<Piece> findPieceByProductId(@Param("productId") String productId);
}
