import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cross from '../assets/cross.svg';
import Naught from '../assets/naught.svg';
import { useGameContext } from '../contexts/GameContext';
import useGameService from '../hooks/useGameService';

interface NewGameProps {
    showNewGameForm: boolean;
    setShowNewGameForm: (state: boolean) => void;
}

function NewGame({ showNewGameForm, setShowNewGameForm }: NewGameProps) {
    let navigate = useNavigate();
    const gameContext = useGameContext();
    const gameService = useGameService();

    const [hostIsNaughts, setHostIsNaughts] = useState(false);
    const [gameName, setGameName] = useState('New Game');

    const createGameAction = async () => {
        const game = await gameService.createGame({
            name: gameName,
            hostIsNaughts: hostIsNaughts
        });
        gameContext.game = game;
        gameContext.currentPlayer = game.hostIsNaughts ? "naughts" : "cross";
        navigate('/game/' + game._id);
    }

    const handleGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGameName(event.target.value);
    }

    return (
        <div className="new-game">
            <input type="text" value={gameName} onChange={handleGameNameChange} placeholder="Game name" />

            <p>Choose your side:</p>

            <div className="new-game__sides">
                <img className={`new-game__sides__side ${hostIsNaughts ? "" : "bg-green"}`} src={Cross} onClick={() => setHostIsNaughts(false)} alt="Crosses" />
                <img className={`new-game__sides__side ${hostIsNaughts ? "bg-green" : ""}`} src={Naught} onClick={() => setHostIsNaughts(true)} alt="Naughts" />
            </div>

            <div className="buttons">
                <Button buttonText='Back' onClick={() => setShowNewGameForm(!showNewGameForm)}/>
                <Button buttonText='Create Game' onClick={() => createGameAction()}/>
            </div>
        </div>
    );
}

export default NewGame;