import { createContext, useState } from "react";
import { ContextProviderProps, ScoreContextType } from "../general/Interfaces";

export const ScoreContext = createContext({} as ScoreContextType);

export function ScoreContextProvider(props: ContextProviderProps) {
    const [score, setScore] = useState(0);

    return (
        <ScoreContext.Provider value={{ score, setScore }} >
            {props.children}
        </ScoreContext.Provider>
    )
}