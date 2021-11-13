import { Button } from "antd";
import { useContext } from "react"
import { CountrySelectorContext } from "../contexts/CountrySelectorContext";
import { GameOverContext } from "../contexts/GameOverContextProvider"

import '../styles/gameOver.scss'

export function GameOver() {
    const {setGameOver} = useContext(GameOverContext);
    const { previous } = useContext(CountrySelectorContext);

    function handleClick() {
        setGameOver(false);
    }

    return (
        <>
            <div className="game-over-background">
                <div className="game-over-container">
                    <div className="game-over-title">
                        <h1>Game Over</h1>
                    </div>
                    <div className="game-over-body">
                        <p>The temperature in {previous?.capital.city} - {previous?.name} is {previous?.capital.temperature} °C</p>
                    </div>
                    <div className="game-over-footer">
                        <Button type="primary" onClick={handleClick}>Play Again</Button>
                    </div>
                </div>
            </div>
        </>
    )    
}