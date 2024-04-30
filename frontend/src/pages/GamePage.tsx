import Board from '../components/Board'
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';
import { useParams } from 'react-router-dom';
import useGameService from '../hooks/useGameService';
import { useEffect } from 'react';
import io from 'socket.io-client';

//@ts-ignore
const socket = io.connect("http://localhost:3000/game");

function GamePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const gameContext = useGameContext();
    const gameService = useGameService();

    const endGame = async () => {        
        if (id) {
            await gameService.deleteGame(id);
        }
        gameContext.game = undefined;
        navigate('/');
    }

    useEffect(() => {
        const data = {
            gameId: gameContext.game?._id,
            player: gameContext.currentPlayer
        }
        gameService.sendMessage(socket, "play", { data: data });
    }, []);

    return (
        <div className='game'>
            <Link to='/'><h1>TicTacToe</h1></Link>
            <h2>{gameContext.game?.name}</h2>
            <p>You are {gameContext.currentPlayer}</p>
            <Board socket={socket}/>
            <br/>
            <h3>{gameContext.winner}</h3>
            <br />
            <Button buttonText='End Game' onClick={() => endGame()}/>
        </div>
    )
}

export default GamePage;