import setPreviousPage from "../functions/setPreviousPage";
import setNextPage from "../functions/setNextPage";
import setFirstPage from "../functions/setFirstPage";
import { useEffect, useState } from "react";
import { getAllGames } from "../../gamesapi";
import addGameToList from "../functions/addGameToList";
import deleteGameFromList from "../functions/deleteGameFromList";

function AllGamesList() {
    const [games, setGames] = useState([]);
    const [myGames, setMyGames] = useState({ name: "", desc: "", games: [] });
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
    }, [page, myGames.games.length]);

    const handleFetch = () => {
        getAllGames(page)
            .then(data => setGames(data.results));
    };

    function handleAdd(game) {
        setMyGames({
            games: [...myGames.games, addGameToList({ name: game.name, year: game.year })]
        })
    }

    function handleDelete(name) {
        setMyGames({
            games: [...myGames.games, deleteGameFromList(myGames.games.find(e => e.name == name).game_id)]
        })
    }

    return (
        <div class="d-flex justify-content-center">
            {games.length < 1 ? (<></>) :
                <div style={{ minWidth: "50%" }}>
                    <table class="table table-striped align-middle table-bordered">
                        <thead >
                            <tr>
                                <th>Name</th>
                                <th width="20%">Release Year</th>
                                <th width="14%"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.name}</td>
                                        <td>{val.released.slice(0, 4)}</td>
                                        <td class="d-flex justify-content-center">{myGames.games.some(e => e.name == val.name) == true
                                            ? <button onClick={() => {
                                                handleDelete(myGames.games.find(e => e.name == val.name).name)
                                            }} class="btn btn-danger">Delete</button>
                                            : <button onClick={() => {
                                                handleAdd({ name: val.name, year: val.released.slice(0, 4) })
                                            }} class="btn btn-primary">Add</button>}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <nav>
                        <ul class="pagination justify-content-center">
                            <div class="d-flex justify-content-center">{page == 1
                                ? <>
                                    <li>
                                        <button type="button" class="btn disabled" style={{ borderColor: "#dee2e6", borderRadius: "10px 0px 0px 10px", borderRight: "0px", backgroundColor: "#e9ecef" }}>
                                            <i class="bi bi-skip-backward"></i>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => setPage(setPreviousPage(page))} type="button" class="btn disabled" style={{ borderColor: "#dee2e6", borderRadius: "0px", backgroundColor: "#e9ecef" }}>Previous</button>
                                    </li>
                                </>
                                : <>
                                    <li>
                                        <button onClick={() => setPage(setFirstPage())} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "10px 0px 0px 10px", color: "#0d6efd", borderRight: "0px" }}>
                                            <i class="bi bi-skip-backward"></i>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => setPage(setPreviousPage(page))} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "0px", color: "#0d6efd" }}>Previous</button>
                                    </li>
                                </>
                            }
                                <li>
                                    <p class="btn" style={{ color: "#ffffff", borderRadius: "0px", borderLeft: "0px", backgroundColor: "#0d6efd" }}>{page}</p>
                                </li>
                                <li>
                                    <button onClick={() => setPage(setNextPage(page))} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "0px 10px 10px 0px", color: "#0d6efd", borderLeft: "0px" }}>Next</button>
                                </li>
                            </div>
                        </ul>
                    </nav>
                </div>
            }
        </div>

    )
}

export default AllGamesList;