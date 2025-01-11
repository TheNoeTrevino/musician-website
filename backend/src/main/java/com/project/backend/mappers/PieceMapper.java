package com.project.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.project.backend.DTOs.PieceDTO;
import com.project.backend.models.Piece;

@Mapper(componentModel = "spring")
public interface PieceMapper {
  @Mapping(source = "id", target = "pieceId")
  public PieceDTO PieceToDTO(Piece order);
}
