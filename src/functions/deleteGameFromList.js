async function deleteGameFromList(id) {
    await fetch(`http://localhost:3000/mygame/${id}`, {
        method: "DELETE",
    });
}

export default deleteGameFromList;