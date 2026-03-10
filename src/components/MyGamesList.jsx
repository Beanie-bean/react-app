import { useEffect, useState } from "react";
import deleteGameFromList from "../functions/deleteGameFromList";

function MyGamesList() {
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
        getMyGames();
        return;
    }, [page, myGames[0]]);

    console.log(myGames)

    return (
        <div class="d-flex justify-content-center">
            {myGames.length < 1 ? (<></>) :
                <div class="w-50">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th width="25%">Release Year</th>
                                <th width="10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {myGames.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.name}</td>
                                        <td>{val.year}</td>
                                        <td>
                                            <button onClick={() => {
                                                setMyGames([
                                                    deleteGameFromList(myGames, myGames.find(e => e.name == val.name)._id)
                                                ])
                                            }} class="btn btn-danger">Delete</button>
                                            </td>
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

export default MyGamesList;