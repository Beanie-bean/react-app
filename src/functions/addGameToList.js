async function addGameToList(game) {
    try {
        const response = await fetch(`http://localhost:8080/mygame/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(game),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return ({
            name: game.name,
            year: game.year
        });
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};
export default addGameToList;