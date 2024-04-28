interface GameRowProps {
    game: string;
    onClick: () => void;
}

function GameRow({ game, onClick }: GameRowProps) {
    return (
        <div className="game-row">
            <h6>{game}</h6>
            <div className="game-row__join-button" onClick={onClick}>
                Join
            </div>
        </div>
    )
}

export default GameRow;