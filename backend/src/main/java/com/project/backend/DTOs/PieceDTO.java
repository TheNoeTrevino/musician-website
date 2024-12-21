package com.project.backend.DTOs;

import java.time.LocalDate;
import lombok.Data;

@Data
public class PieceDTO {
  private long pieceId;
  private String title;
  private String composer;
  private Double price;
  private LocalDate dateComposed;
}
