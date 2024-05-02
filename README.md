# Tic Tac Toe
Multiplayer game of Tic Tac Toe using websockets

## How to run

### Backend
```bash
$ cd backend
$ nest start
```

### Frontend
```bash
$ cd frontend
$ npm install
$ npm run dev
```

### Database
```bash
$ cd database
$ docker-compose up
```

## How to play
- Open the browser and go to `http://localhost:5173`
- Create a new game
- Open another browser and go to `http://localhost:5173`
- Join the game
- Play the game

## Choices made

### Backend
- Games are created using A REST API, because of the ease of use and simplicity
- Websockets are used to communicate between the players, because of the real-time nature of the game
- The game state is stored in memory, because of the simplicity of the game

### Frontend
- Chose to use useContext to manage the state of the game, because of the simplicity of the game
- Scss is used to style the game, because of nesting and variables

### Database
- Chose mongoDB because of the ease of use and simplicity