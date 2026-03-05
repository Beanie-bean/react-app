import { useEffect, useState } from "react";
import { getAllGames } from "../../gamesapi";

function AllGames() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleFetch();
  }, [page]);

  const handleFetch = () => {
    getAllGames(page)
      .then(data => setGames(data.results));
  };

  const setNextPageData = () => {
    setPage(page + 1)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const setPreviousPageData = () => {
    if (page == 1) {
      setPage(1);
    }
    else {
      setPage(page - 1);
    };
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  };

  return (
    <>
      <h2 class="d-flex justify-content-center">All Games</h2>
      <div class="d-flex justify-content-center">
        <div class="w-50">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th width="25%">Release Year</th>
              </tr>
            </thead>
            <tbody>
              {games.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.name}</td>
                    <td>{val.released.slice(0, 4)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <nav>
            <ul class="pagination justify-content-center">
              <div>
                <button onClick={() => setPage(1)} type="button" class="page-link" value="">
                  <i class="bi bi-skip-backward"></i>
                </button>
              </div>
              <input onClick={setPreviousPageData} type="button" class="page-link" value="Previous" />
              <input onClick={setNextPageData} type="button" class="page-link" value="Next" />
            </ul>
          </nav>

        </div>
      </div>
    </>
  )
}

export default AllGames;
