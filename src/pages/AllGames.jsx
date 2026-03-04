import { useEffect, useState } from "react";
import { getAllGames } from "../../gamesapi";

function AllGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    getAllGames()
      .then(data => setGames(data.results));
  }

  console.log(games);

  return (
    <>
      <h1>React Games</h1>
    </>
  )
}

export default AllGames;
