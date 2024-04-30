import { useState, useEffect } from 'react';
import Cross from "../assets/cross.svg";
import Naught from "../assets/naught.svg";
import { useGameContext } from '../contexts/GameContext';
import useGameService from '../hooks/useGameService';
import { Move, Play } from '../types/Game';

function Board({ socket }: any) {

    const gameContext = useGameContext();
    const gameService = useGameService();

    const [board, setBoard] = useState([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]);

    const [yourTurn, setYourTurn] = useState(false);

    const handleClick = (row: number, col: number) => {
        // Check if the cell is empty
        if (board[row][col] === 0) {
            // Create a copy of the board
            const newBoard = [...board];
            // Update the cell with the current player
            newBoard[row][col] = gameContext.currentPlayer === "cross" ? 1 : 2;

            const move = {
                gameId: gameContext.game?._id,
                board: newBoard,
                player: gameContext.currentPlayer
            }
            gameService.sendMessage(socket, "move", { move: move });

            // Update the state with the new board
            setBoard(newBoard);
        }
    };

    useEffect(() => {
        socket.on('move', (move: Move) => {
            setYourTurn(move.turn === gameContext.currentPlayer);
            setBoard(move.board);
            if (move.winner) {
                gameContext.winner = move.winner;
            }
        })

        socket.on('play', (play: Play) => {
            setBoard(play.board);
            setYourTurn(play.turn === gameContext.currentPlayer);
        })
    }, [socket]);

    return (
        <div className={`board ${yourTurn ? "" : "board-disabled"}`}>
            {board.map((row, rowIndex) => {
                return (
                    <div className='row' key={rowIndex}>
                        {row.map((column, columnIndex) => {
                            return (
                                <div className="box" key={columnIndex} onClick={() => handleClick(rowIndex, columnIndex)}>
                                    {column == 1 && <img src={Cross} alt="cross" />}
                                    {column == 2 && <img src={Naught} alt="naught" />}
                                </div>
                            )
                        })}
                    </div>
                )                
            })}
        </div>
    )
}

export default Board