import { useEffect, useState } from "react";

function MyGamesList() {
    const [myGames, setMyGames] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
    }, [page]);

    return (
        <div class="d-flex justify-content-center">
            {myGames.length < 1 ? (<></>) :
                <div class="w-50">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th width="25%">Release Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myGames.map((val, key) => {
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