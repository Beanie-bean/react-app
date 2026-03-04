import { Routes, Route } from 'react-router';
import AllGames from './pages/AllGames';
import MyGames from './pages/MyGames';

function App() {
  return (
   <Routes>
      <Route path="/" element={<AllGames/>} />;
      <Route path="/mygames" element={<MyGames/>} />;
   </Routes>
  )
};

export default App;

