import { useContext } from "react";
import { RandomCountryContext } from "../contexts/RandomCountryContext";

export function RandomCountry() {
    const { randomCountry } = useContext(RandomCountryContext);
    
    return (
        <>
            <h1 className="country-name">
                {randomCountry?.name}
            </h1>
            <h2>
                Capital: {randomCountry?.capital.city}
            </h2>
            <h2>
                Temperature: {randomCountry?.capital.temperature} °C
            </h2>
        </>
    )
}