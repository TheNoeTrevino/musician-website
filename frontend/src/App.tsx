import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./pages/shop/Shop";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Showcase from "./pages/showcase/Showcase";
import Checkout from "./pages/checkout/Checkout";
import ErrorPage from "./pages/ErrorPage";
import { PieceService } from "./services/PieceService";
import { useEffect, useState } from "react";
import { PieceDTO } from "./dtos/dtos";

function App() {
  const fetchPieces = async () => {
    const pieces = await PieceService.getAllPieces();
    setPieces(pieces);
  };

  const [pieces, setPieces] = useState<PieceDTO[]>([]);

  // getting pieces from the backend so we can use all of them for the routes!
  // Also, using this for sSong cards as well be good
  useEffect(() => {
    fetchPieces();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<ErrorPage />} />
        {pieces.map((piece) => (
          <Route
            key={piece.pieceId}
            path={`${piece.title.replace(/ /g, "-")}`}
            element={<Showcase piece={piece} />}
          ></Route>
        ))}
      </Routes>
    </Router>
  );
}

export default App;
