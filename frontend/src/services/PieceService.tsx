import { PieceDTO } from "../dtos/dtos";

// TODO: make some test buttons for this
export const PieceService = {
  async getPiecesWithSort(
    orderBy: string,
    sortOrder: string,
  ): Promise<PieceDTO[]> {
    try {
      const response = await fetch(
        `http://localhost:8080/pieces/?orderBy=${orderBy}&sortOrder=${sortOrder}`,
        {
          method: "GET",
        },
      );

      console.log(
        `fetching pices with params orderBy: ${orderBy}, sortOrder: ${sortOrder}`,
      );

      if (!response.ok) {
        alert("Something went wrong fetching pieces");
      }

      const piecesData: PieceDTO[] = await response.json();

      return piecesData;
    } catch (error) {
      throw new Error(`Something went wrong fetching the pieces: ${error}`);
    }
  },

  async getPieceById(pieceId: number): Promise<PieceDTO> {
    try {
      const response = await fetch(
        `http://localhost:8080/pieces/piece/${pieceId}`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        alert("Something went wrong fetching pieces");
      }

      const pieceData: PieceDTO = await response.json();

      return pieceData;
    } catch (error) {
      throw new Error(
        `something went wrong fetching piece with id: ${pieceId}. Error: ${error}`,
      );
    }
  },
};
