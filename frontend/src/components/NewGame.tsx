import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cross from '../assets/cross.svg';
import Naught from '../assets/naught.svg';
import useGame from '../hooks/useGame';

interface NewGameProps {
    showNewGameForm: boolean;
    setShowNewGameForm: (state: boolean) => void;
}

function NewGame({ showNewGameForm, setShowNewGameForm }: NewGameProps) {
    const { createGame } = useGame();
    let navigate = useNavigate();
    const [hostIsNaughts, setHostIsNaughts] = useState(false);
    const [gameName, setGameName] = useState('New Game');

    const createGameAction = async () => {
        console.log('Creating game');
        const game = await createGame({
            name: gameName,
            hostIsNaughts: hostIsNaughts
        });
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