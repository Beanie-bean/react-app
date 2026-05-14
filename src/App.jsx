import { Routes, Route } from 'react-router';
import AllGamesPage from './pages/AllGamesPage';
import MyGamesPage from './pages/MyGamesPage';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllGamesPage />} />;
        <Route path="/mygames" element={<MyGamesPage />} />;
      </Routes>
    </>
  )
};

export default App;

