import setPreviousPage from "../functions/setPreviousPage";
import setNextPage from "../functions/setNextPage";
import setFirstPage from "../functions/setFirstPage";
import { useEffect, useState } from "react";
import deleteGameFromList from "../functions/deleteGameFromList";
import EditListModal from "./EditListModal";

function MyGamesList() {
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
        getMyGames();
        return;
    }, [page, myGames.games.length]);

    function handleDelete(name) {
        setMyGames({
            games: [...myGames.games, deleteGameFromList(myGames.games.find(e => e.name == name).game_id)]
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
                    <EditListModal name={ myGames.name } desc={ myGames.desc } handleEdit={handleEdit}/>
                </div>
            </div>
            <p class="d-flex justify-content-center">{myGames.desc}</p>
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
                                {myGames.games.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.name}</td>
                                            <td>{val.year}</td>
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
                                <div class="d-flex justify-content-center">{page == 1
                                    ? <>
                                        <li class="page-item">
                                            <button type="button" class="btn disabled" style={{ borderColor: "#dee2e6", borderRadius: "10px 0px 0px 10px", borderRight: "0px", backgroundColor: "#e9ecef" }}>
                                                <i class="bi bi-skip-backward"></i>
                                            </button>
                                        </li>
                                        <li class="page-item">
                                            <button onClick={() => setPage(setPreviousPage(page))} type="button" class="btn disabled" style={{ borderColor: "#dee2e6", borderRadius: "0px", backgroundColor: "#e9ecef" }}>Previous</button>
                                        </li>
                                    </>
                                    : <>
                                        <li class="page-item">
                                            <button onClick={() => setPage(setFirstPage())} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "10px 0px 0px 10px", color: "#0d6efd", borderRight: "0px" }}>
                                                <i class="bi bi-skip-backward"></i>
                                            </button>
                                        </li>
                                        <li class="page-item">
                                            <button onClick={() => setPage(setPreviousPage(page))} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "0px", color: "#0d6efd" }}>Previous</button>
                                        </li>
                                    </>
                                }
                                    <li>
                                        <p class="btn" style={{ color: "#ffffff", borderRadius: "0px", borderLeft: "0px", backgroundColor: "#0d6efd" }}>{page}</p>
                                    </li>
                                    <li class="page-item">
                                        <button onClick={() => setPage(setNextPage(page))} type="button" class="btn" style={{ borderColor: "#dee2e6", borderRadius: "0px 10px 10px 0px", color: "#0d6efd", borderLeft: "0px" }}>Next</button>
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