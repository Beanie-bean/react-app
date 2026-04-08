async function editList(list) {
    try {
        const response = await fetch(`http://localhost:3000/mygame/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(list),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};
export default editList;