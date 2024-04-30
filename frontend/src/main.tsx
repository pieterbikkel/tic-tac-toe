import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GamePage from './pages/GamePage.tsx'
import './styles/index.scss'
import { GameState } from './types/Game.tsx'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { GameContext } from './contexts/GameContext.ts'

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    index: true,
  },
  {
    path: "/game/:id",
    element: <GamePage/>,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path:"*",
    element:<p>404 Error - Nothing here...</p>
  }
]);

function Main() {

  const [gameState] = useState<GameState>({
    board: [[0, 0, 0], [0, 0, 0],[0, 0, 0]],
    currentPlayer: "",
    game: undefined,
    winner: "",
    players: 0
  });

  return (
    <React.StrictMode>    
      <GameContext.Provider value={gameState}>
        <RouterProvider router={BrowserRouter}/>
      </GameContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
