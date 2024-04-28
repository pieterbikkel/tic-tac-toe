import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Game from './pages/Game.tsx'
import './styles/index.scss'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/game/:id",
    element: <Game/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter}/>
  </React.StrictMode>
)
