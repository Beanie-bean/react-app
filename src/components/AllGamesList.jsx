import setPreviousPage from "../functions/setPreviousPage";
import setNextPage from "../functions/setNextPage";
import setFirstPage from "../functions/setFirstPage";
import { useEffect, useState } from "react";
import { getAllGames } from "../../gamesapi";
import addGameToList from "../functions/addGameToList";
import deleteGameFromList from "../functions/deleteGameFromList";

function AllGamesList() {
    const [games, setGames] = useState([]);
    const [myGames, setMyGames] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getMyGames() {
            const response = await fetch(`http://localhost:8080/mygame/`);
            if (!response.ok) {
                const message = `Error: ${response.statusText}`;
                console.error(message);
                return;
            }
            const mygames = await response.json();
            setMyGames(mygames);
        }
        handleFetch();
        getMyGames();
    }, [page, myGames.length]);

    const handleFetch = () => {
        getAllGames(page)
            .then(data => setGames(data.results));
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
                                        <td>{myGames.some(e => e.name == val.name) == true
                                            ? <button onClick={() => {
                                                setMyGames([
                                                    deleteGameFromList(myGames, myGames.find(e => e.name == val.name)._id)
                                                ])
                                            }} class="btn btn-danger">Delete</button>
                                            : <button onClick={() => {
                                                setMyGames([
                                                    ...myGames,
                                                    addGameToList({ name: val.name, year: val.released.slice(0, 4) })
                                                ])
                                            }} class="btn btn-primary">Add</button>}</td>
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