async function deleteGameFromList(myGames, id) {
    await fetch(`http://localhost:8080/mygame/${id}`, {
        method: "DELETE",
    });
    const newList = myGames.filter((e) => e.id !== id);
    return newList;
}

export default deleteGameFromList;