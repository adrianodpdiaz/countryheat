import { useContext } from "react"
import { ScoreContext } from "../contexts/ScoreContextProvider";

export function Score() {
    const { score } = useContext(ScoreContext);

    return (
        <h1 className="score">Score: {score}</h1>
    )
}