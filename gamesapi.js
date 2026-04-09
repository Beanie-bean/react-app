const apiKey = import.meta.env.VITE_API_KEY;

export async function getAllGames(page) {
    return fetch(`https://rawg.io/api/games?key=${apiKey}&page=${page}&page_size=40`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetching all games: " + response.status.toString());
            }
            return response.json();
        })
};

export async function getGamesByText(text, page) {
    return fetch(`https://rawg.io/api/games?key=${apiKey}&page=${page}&page_size=40&search=${text}`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in fetching games by text: " + response.status.toString());

            return response.json();
        })
}