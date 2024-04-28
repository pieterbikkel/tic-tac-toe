import { useState } from 'react';
import { Game, CreateGame } from '../types/Game';

const useGame = () => {

    const [games, setGames] = useState<Game[]>([]);

    const getGames = async () => {
        try {
            const data = await fetch('http://localhost:3000/games');
            const jsonData = await data.json(); 
            setGames(jsonData);
        } catch (error) {
            console.log("Oh no! An error occurred!");
            console.error(error);
        }
    }

    const createGame = async (game: CreateGame): Promise<Game> => {
        try {
            const data = await fetch('http://localhost:3000/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game),
            });
            const jsonData = await data.json();
            setGames([...games, jsonData]);
            return jsonData;
        } catch (error) {
            console.log("Oh no! An error occurred!");
            console.error(error);
            return new Promise((resolve, reject) => {});
        }
    }

    const deleteGame = async (id: string) => {
        try {
            await fetch(`http://localhost:3000/games/${id}`, {
                method: 'DELETE',
            });
            setGames(games.filter((game) => game._id !== id));
        } catch (error) {
            console.log("Oh no! An error occurred!");
            console.error(error);
        }
    }

    return { getGames, games, createGame, deleteGame };
}

export default useGame;
