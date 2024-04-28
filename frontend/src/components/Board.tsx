function Board() {

    const handleClick = (e: React.MouseEvent<HTMLDivElement>, boxNumber: number) => {
        
    }

    return (
        <div className='board'>
            <div className="box" onClick={(e) => handleClick(e, 1)}></div>
            <div className="box" onClick={(e) => handleClick(e, 2)}></div>
            <div className="box" onClick={(e) => handleClick(e, 3)}></div>

            <div className="box" onClick={(e) => handleClick(e, 4)}></div>
            <div className="box" onClick={(e) => handleClick(e, 5)}></div>
            <div className="box" onClick={(e) => handleClick(e, 6)}></div>

            <div className="box" onClick={(e) => handleClick(e, 7)}></div>
            <div className="box" onClick={(e) => handleClick(e, 8)}></div>
            <div className="box" onClick={(e) => handleClick(e, 9)}></div>
        </div>
    )
}

export default Board