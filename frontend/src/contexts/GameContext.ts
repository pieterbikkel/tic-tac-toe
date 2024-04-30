import { createContext, useContext } from "react";
import { GameState } from "../types/Game";

// Create a context with a default value
export const GameContext = createContext<GameState | undefined>(undefined);

export const useGameContext = () => {
    const gameContext = useContext(GameContext);
    if (gameContext === undefined) {
        throw new Error("useGameContext must be used within a GameContextProvider");
    }

    return gameContext;
}