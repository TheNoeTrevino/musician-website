import { PieceDTO } from "../dtos/dtos";

const baseUrl = import.meta.env.BACKEND_URL;

// TODO: make some test buttons for this
export const PieceService = {
  async getAllPieces(
    orderBy?: string,
    sortOrder?: string,
  ): Promise<PieceDTO[]> {
    try {
      orderBy = orderBy || "title";
      sortOrder = sortOrder || "ASC";
      const params = new URLSearchParams({
        orderBy: orderBy,
        sortOrder: sortOrder,
      });

      const response = await fetch(
        `${baseUrl}/pieces/?${params.toString()}`,
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
        `${baseUrl}/pieces/piece/${pieceId}`,
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
