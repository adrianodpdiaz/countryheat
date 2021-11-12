import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export function RandomCountry() {
    const {randomCountry, randomCountryCapital, temperature} = useContext(DataContext);

    return (
        <>
            <h1>
                {randomCountry}
            </h1>
            <p>
                Capital: {randomCountryCapital}
            </p>
            <p>
                Temperature: {temperature}
            </p>
        </>
    )
}