import Button from './Button';
import GameRow from './GameRow';
import { Game } from '../types/Game';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../contexts/GameContext';

interface AvailableGamesProps {
    showNewGameForm: boolean;
    setShowNewGameForm: (state: boolean) => void;
    games: Game[];
}

function AvailableGames({ showNewGameForm, setShowNewGameForm, games }: AvailableGamesProps) {

    const navigate = useNavigate();
    const gameContext = useGameContext();

    const joinGameAction = (game: Game) => {
        gameContext.game = game;
        gameContext.currentPlayer = game.hostIsNaughts ? "cross" : "naughts";
        navigate('/game/' + game._id);
    }

    return (
        <>
            <div className="available-games">
                <div className="available-games__line"></div>
                <p>Available games</p>
                <div className="available-games__line"></div>            
            </div>

            {games.map((game) => (
                <GameRow key={game._id} game={game.name} onClick={() => joinGameAction(game)}/>
            ))}

            <Button buttonText='New Game' onClick={() => setShowNewGameForm(!showNewGameForm)}/>
        </>
    )
}

export default AvailableGames;