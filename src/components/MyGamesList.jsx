import setPreviousPage from "../functions/setPreviousPage";
import setNextPage from "../functions/setNextPage";
import setFirstPage from "../functions/setFirstPage";
import { useEffect, useState } from "react";
import deleteGameFromList from "../functions/deleteGameFromList";
import EditListModal from "./EditListModal";
import AddGameModal from "./AddGameModal";

function MyGamesList() {
    const [myGames, setMyGames] = useState({ name: "", desc: "", games: [] });
    const [page, setPage] = useState(1);
    const [pageGames, setPageGames] = useState([]); 
    const totalPages = Math.ceil(myGames.games.length / 20);

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
        getMyGames();
        setPageGames(myGames.games.slice((page - 1) * 20, (page - 1) * 20 + 20));
        return;
    }, [page, myGames.games.length]);
    
    function handleDelete(name) {
        setMyGames({
            games: [...myGames.games, deleteGameFromList(myGames.games.find(e => e.name == name).game_id)]
        })
    }

    function handleAdd(game) {
        setMyGames({
            games: [...myGames.games, {name: game.name, released: game.released}]
        })
    }

    function handleEdit(name, desc) {
        setMyGames({
            ...myGames,
            name: name, desc: desc
        })
    }

    return (
        <>
            <div class="pt-2 row justify-content-end">
                <div class="col-4 d-flex justify-content-center">
                    <h5 class="d-flex justify-content-center">{myGames.name}</h5>
                </div>
                <div class="col-4 d-flex justify-content-end">
                    <EditListModal name={myGames.name} desc={myGames.desc} handleEdit={handleEdit} />
                </div>
            </div>
            <p class="d-flex justify-content-center">{myGames.desc}</p>
            <AddGameModal handleAdd={handleAdd} />
            <div class="d-flex justify-content-center">
                <div style={{ minWidth: "50%" }}>
                    {myGames.games.length < 1 ? (<></>) :
                        <table class="table table-striped table-bordered align-middle table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th width="20%">Release Year</th>
                                    <th width="14%"></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {pageGames.map((val, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{val.name}</td>
                                                <td>{val.released}</td>
                                                <td>
                                                    <button onClick={() => {
                                                        handleDelete(val.name);
                                                    }} class="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                
                            </tbody>
                        </table>
                    }
                    {myGames.games.length < 20 ? (<></>) :
                        <nav>
                            <ul class="pagination justify-content-center">
                                <div class="d-flex justify-content-center">
                                    <li class="page-item">
                                        <button onClick={() => setPage(setFirstPage())} disabled={page == 1} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "10px 0px 0px 10px", borderRight: "0px", backgroundColor: page == 1 ? "#e9ecef" : "#ffffff", color: page == 1 ? "#495057" : "#0d6efd" }}>
                                            <i class="bi bi-skip-backward"></i>
                                        </button>
                                    </li>
                                    <li class="page-item">
                                        <button onClick={() => setPage(setPreviousPage(page))} disabled={page == 1} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "0px", backgroundColor: page == 1 ? "#e9ecef" : "#ffffff", color: page == 1 ? "#495057" : "#0d6efd" }}>Previous</button>
                                    </li>
                                    <li>
                                        <p class="btn" style={{ color: "#ffffff", borderRadius: "0px", borderLeft: "0px", backgroundColor: "#0d6efd" }}>{page}</p>
                                    </li>
                                    <li class="page-item">
                                        <button onClick={() => setPage(setNextPage(page))} disabled={page == totalPages} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "0px 10px 10px 0px", borderLeft: "0px", backgroundColor: page == totalPages ? "#e9ecef" : "#ffffff", color: page == totalPages ? "#495057" : "#0d6efd" }}>Next</button>
                                    </li>
                                </div>
                            </ul>
                        </nav>
                    }
                </div>
            </div>
        </>
    )
}

export default MyGamesList;