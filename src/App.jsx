import { Routes, Route } from 'react-router';
import AllGames from './pages/AllGames';
import MyGames from './pages/MyGames';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllGames />} />;
        <Route path="/mygames" element={<MyGames />} />;
      </Routes>
    </>
  )
};

export default App;

