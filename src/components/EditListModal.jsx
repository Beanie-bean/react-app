import editList from "../functions/editList";
import { useState } from "react";

function EditListModal({name, desc, handleEdit}) {
    const [list, setList] = useState({ name: "", desc: "" });

    function handleSaveList() {
        editList(list);
        handleEdit(list.name, list.desc)
        setList({ name: "", desc: "" });
    }

    return (
        <>
            <div>
                <button onClick={() => setList({name: name, desc: desc})} type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#editListModal">
                    Edit<i class="ps-1 bi bi-pencil-square"></i>
                </button>
            </div>
            <div class="modal" id="editListModal" aria-labelledby="editListModal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="editListModal">Edit List</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label mt-1 d-flex justify-content-start">Name</label>
                                <input value={list.name} onChange={e => setList({ ...list, name: e.target.value })} class="form-control" id="listNameInput" />
                                <label class="form-label mt-1 d-flex justify-content-start">Description</label>
                                <input value={list.desc} onChange={e => setList({ ...list, desc: e.target.value })} class="form-control" id="listDescInput" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSaveList} class="btn btn-primary" data-bs-dismiss="modal">Save List</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditListModal;