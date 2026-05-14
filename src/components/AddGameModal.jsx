import addGameToList from "../functions/addGameToList";
import { useState } from "react";

function AddGameModal({ handleAdd }) {
    const [game, setGame] = useState({ name: "", released: "" });

    function handleSaveGame() {
        addGameToList(game);
        handleAdd(game.name, game.released)
        setGame({ name: "", released: "" });
    }

    return (
        <>  
            <div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addGameModal">
                    Add Game
                </button>
            </div>
            <div class="modal" id="addGameModal" aria-labelledby="addGameModal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="addGameModal">Add Game</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label mt-1">Name</label>
                                <input value={game.name} onChange={e => setGame({ ...game, name: e.target.value })} class="form-control" id="listNameInput" />
                                <label class="form-label mt-1">Release Year</label>
                                <input value={game.released} onChange={e => setGame({ ...game, released: e.target.value })} class="form-control" id="listDescInput" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSaveGame} class="btn btn-primary" data-bs-dismiss="modal">Save Game</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddGameModal;