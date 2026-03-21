async function deleteGameFromList(id) {
    await fetch(`http://localhost:8080/mygame/${id}`, {
        method: "DELETE",
    });
}

export default deleteGameFromList;