import { createContext, useState, useEffect } from "react";
import { Country, ContextProviderProps, RandomCountryContextType } from "../general/Interfaces";
import { toCountryObject } from "../general/GeneralFunctions";

export const RandomCountryContext = createContext({} as RandomCountryContextType);

export function RandomCountryContextProvider(props: ContextProviderProps) {
    const [randomCountry, setRandomCountry] = useState<Country>();

    useEffect(() => {
        async function getRandomCountry() {
            toCountryObject("random").then((response) => {
                setRandomCountry({
                    name: response.name,
                    capital: {
                        city: response.capital.city,
                        temperature: response.capital.temperature
                    }
                });
            });
        }

        getRandomCountry();
    }, []);

    return (
        <RandomCountryContext.Provider value={{ randomCountry, setRandomCountry }} >
            {props.children}
        </RandomCountryContext.Provider>
    )
}
