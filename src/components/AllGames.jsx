import setPreviousPage from "../functions/setPreviousPage";
import setNextPage from "../functions/setNextPage";
import setFirstPage from "../functions/setFirstPage";
import setCurrentPage from "../functions/setCurrentPage";
import { useEffect, useState } from "react";
import { getAllGames, getGamesByText } from "../../gamesapi";
import addGameToList from "../functions/addGameToList";
import deleteGameFromList from "../functions/deleteGameFromList";

function AllGames() {
    const [games, setGames] = useState([]);
    const [myGames, setMyGames] = useState({ name: "", desc: "", games: [] });
    const [page, setPage] = useState(1);
    const [searchWord, setSearchWord] = useState("");
    const [checkNextPage, setCheckNextPage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getMyGames() {
            const response = await fetch(`http://localhost:3000/mygame/`);
            if (!response.ok) {
                const message = `Error: ${response.statusText}`;
                console.error(message);
                return;
            }
            const mygames = await response.json();
            setMyGames(mygames);
        }
        if (searchWord == "") {
            handleFetch();
        }
        else {
            handleSearch()
        }
        getMyGames();
    }, [page, myGames.games.length]);
    
    const handleFetch = () => {
        getAllGames(page)
            .then(data => {
                setGames(data.results); 
                setCheckNextPage(data.next);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    };

    const handleSearch = () => {
        setIsLoading(true);
        getGamesByText(searchWord, page)
            .then(data => {
                setGames(data.results)
                setCheckNextPage(data.next);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    }

    function handleSearchClear() {
        setIsLoading(true);
        handleFetch();
        setSearchWord("");
    }

    function handleAdd(game) {
        setMyGames({
            games: [...myGames.games, addGameToList({ name: game.name, released: game.released })]
        })
    }

    function handleDelete(name) {
        setMyGames({
            games: [...myGames.games, deleteGameFromList(myGames.games.find(e => e.name == name)._id)]
        })
    }

    return (
        <div class="d-flex justify-content-center">
            {isLoading 
            ? <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            :
                <div style={{ minWidth: "50%" }}>
                        <div class="input-group mb-3">
                            <input value={searchWord} onChange={e => setSearchWord(e.target.value)}type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            <button onClick={handleSearchClear} class="input-group-text" id="inputGroup-sizing-default"><i class="bi bi-x-lg"></i></button>
                            <button onClick={handleSearch} class="input-group-text" id="inputGroup-sizing-default">Search</button>
                        </div>
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
                                        <td>{val.released != null ? val.released.slice(0, 4) : "-"}</td>
                                        <td class="d-flex justify-content-center">{myGames.games.some(e => e.name == val.name) == true
                                            ? <button onClick={() => {
                                                handleDelete(myGames.games.find(e => e.name == val.name).name)
                                            }} class="btn btn-danger">Delete</button>
                                            : <button onClick={() => {
                                                handleAdd({ name: val.name, released: val.released != null ? val.released : "-" })
                                            }} class="btn btn-primary">Add</button>}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <nav>
                        <ul class="pagination justify-content-center">
                            <div class="d-flex justify-content-center">
                                <nav>
                            <ul class="pagination justify-content-center">
                                <div class="d-flex justify-content-center">
                                    <li class="page-item">
                                        <button onClick={() => {setPage(setFirstPage()); setIsLoading(true)}} disabled={page == 1} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "10px 0px 0px 10px", borderRight: "0px", backgroundColor: page == 1 ? "#e9ecef" : "#ffffff", color: page == 1 ? "#495057" : "#0d6efd" }}>
                                            <i class="bi bi-skip-backward"></i>
                                        </button>
                                    </li>
                                    <li class="page-item">
                                        <button onClick={() => {setPage(setPreviousPage(page)); setIsLoading(true);}} disabled={page == 1} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "0px", backgroundColor: page == 1 ? "#e9ecef" : "#ffffff", color: page == 1 ? "#495057" : "#0d6efd" }}>Previous</button>
                                    </li>
                                    <li>
                                        <button onClick={() => setPage(setCurrentPage(page))} type="button" class="btn" style={{ color: "#ffffff", borderRadius: "0px", borderLeft: "0px", backgroundColor: "#0d6efd" }}>{page}</button>
                                    </li>
                                    <li class="page-item">
                                        <button onClick={() => {setPage(setNextPage(page)); setIsLoading(true)}} disabled={checkNextPage == null} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "0px 10px 10px 0px", borderLeft: "0px", backgroundColor: checkNextPage == null ? "#e9ecef" : "#ffffff", color: checkNextPage == null ? "#495057" : "#0d6efd" }}>Next</button>
                                    </li>
                                </div>
                            </ul>
                        </nav>
                            </div>
                        </ul>
                    </nav>
                </div>
            }
        </div>

    )
}

export default AllGames;