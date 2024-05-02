import { Game, CreateGame } from '../types/Game';

const useGameService = () => {

    const url = 'http://localhost:3000/games';

    const getGames = async () => {
        try {
            const data = await fetch(url);
            return await data.json(); 
        } catch (error) {        
            console.error(error);
        }
    }

    const createGame = async (game: CreateGame): Promise<Game> => {
        try {
            const data = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game),
            });
            const jsonData = await data.json();            
            return jsonData;
        } catch (error) {
            console.error(error);
            return new Promise(() => {});
        }
    }

    const deleteGame = async (id: string) => {
        try {
            await fetch(url + "/" + id, {
                method: 'DELETE',
            });            
        } catch (error) {
            console.error(error);
        }
    }

    const sendMessage = async (socket: any, message: string, data: any) => {
        (socket as any)?.emit(message, data);
    }

    return { getGames, createGame, deleteGame, sendMessage };
}

export default useGameService;
