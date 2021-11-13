import { createContext, useState } from "react";
import { ContextProviderProps, GameOverContextType } from "../general/Interfaces";

export const GameOverContext = createContext({} as GameOverContextType);

export function GameOverContextProvider(props: ContextProviderProps) {
    const [gameOver, setGameOver] = useState(false);

    return (
        <GameOverContext.Provider value={{ gameOver, setGameOver }} >
            {props.children}
        </GameOverContext.Provider>
    )
}