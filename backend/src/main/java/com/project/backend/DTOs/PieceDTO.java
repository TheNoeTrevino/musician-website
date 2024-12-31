package com.project.backend.DTOs;

import java.time.Duration;
import lombok.Data;

@Data
public class PieceDTO {
  private long pieceId;
  private String title;
  private String composer;
  private Double price;
  private Integer yearComposed;
  private boolean hasElectronics;
  private Integer numOfPlayers;
  private Integer difficultyGrade;
  private Duration timeLength;
}
