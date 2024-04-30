import { useState, useEffect } from 'react'
import AvailableGames from './components/AvailableGames'
import NewGame from './components/NewGame'
import { Link } from 'react-router-dom'
import useGameService from './hooks/useGameService'

function App() {

  const [showNewGameForm, setShowNewGameForm] = useState(false)
  const gameService = useGameService();

  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const games = await gameService.getGames();
      setGames(games);
    }
    fetchGames();
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
