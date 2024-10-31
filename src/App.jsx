import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MovieEmbed from "./components/MovieEmbed";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="movie-site/movie/:id" element={<MovieDetails />} />
        <Route path="movie-site/watch/:id" element={<MovieEmbed />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;