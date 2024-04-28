import { useState, useEffect } from 'react'
import AvailableGames from './components/AvailableGames'
import NewGame from './components/NewGame'
import { Link } from 'react-router-dom'
import useGame from './hooks/useGame'

function App() {

  const { getGames, games } = useGame();

  const [showNewGameForm, setShowNewGameForm] = useState(false)

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className='home'>
      <Link to='/'><h1>TicTacToe</h1></Link>

      {!showNewGameForm && <AvailableGames showNewGameForm={showNewGameForm} setShowNewGameForm={setShowNewGameForm} games={games}/>}

      {showNewGameForm && <NewGame showNewGameForm={showNewGameForm} setShowNewGameForm={setShowNewGameForm}/>}

      <br />
    </div>
  )
}

export default App
