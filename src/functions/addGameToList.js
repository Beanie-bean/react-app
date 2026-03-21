async function addGameToList(game) {
    try {
        const response = await fetch(`http://localhost:8080/mygame/add`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(game),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};
export default addGameToList;