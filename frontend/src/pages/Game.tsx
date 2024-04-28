import Board from '../components/Board'
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useGame from '../hooks/useGame';
import { useParams } from 'react-router-dom';

function Game() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { deleteGame } = useGame();

    const endGame = () => {
        console.log('Game ended');
        if (id) {
            deleteGame(id);
        }
        navigate('/');
    }

    return (
        <div className='game'>
            <Link to='/'><h1>TicTacToe</h1></Link>
            <Board/>
            <br />
            <Button buttonText='End Game' onClick={() => endGame()}/>
        </div>
    )
}

export default Game;