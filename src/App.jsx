import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MovieEmbed from "./components/MovieEmbed";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <Router basename="/movie-site">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watch/:id" element={<MovieEmbed />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;