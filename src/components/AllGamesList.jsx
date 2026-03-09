import setPreviousPage from "../functions/setPreviousPage";
import setNextPage from "../functions/setNextPage";
import setFirstPage from "../functions/setFirstPage";
import { useEffect, useState } from "react";
import { getAllGames } from "../../gamesapi";

function AllGamesList() {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [gameToAdd, setGameToAdd] = useState({});

    useEffect(() => {
        handleFetch();
    }, [page]);

    const handleFetch = () => {
        getAllGames(page)
            .then(data => setGames(data.results));
    };

    const addGameToList = (gameName, releseYear) => {
        setGameToAdd({
            name: gameName,
            year: releseYear
        });
    };

    return (
        <div class="d-flex justify-content-center">
            {games.length < 1 ? (<></>) :
                <div class="w-50">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th width="15%">Release Year</th>
                                <th width="10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.name}</td>
                                        <td>{val.released.slice(0, 4)}</td>
                                        <td><button onClick={() => addGameToList(val.name, val.released.slice(0, 4))} class="btn btn-light">Add</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <nav>
                        <ul class="pagination justify-content-center">
                            <div>
                                <button onClick={() => setPage(setFirstPage())} type="button" class="page-link" value="">
                                    <i class="bi bi-skip-backward"></i>
                                </button>
                            </div>
                            <input onClick={() => setPage(setPreviousPage(page))} type="button" class="page-link" value="Previous" />
                            <input onClick={() => setPage(setNextPage(page))} type="button" class="page-link" value="Next" />
                        </ul>
                    </nav>

                </div>
            }
        </div>

    )
}

export default AllGamesList;