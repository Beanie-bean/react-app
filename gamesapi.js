const apiKey = import.meta.env.VITE_API_KEY;

export function getAllGames(page) {
    return fetch(`https://rawg.io/api/games?key=${apiKey}&page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fetching all games: " + response.status.toString());
            }
            return response.json();
        })
};
