import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ContextProviderProps, CountrySelectorContextType, CountryItemType, CountryNameType, Country } from "../general/Interfaces";

export const CountrySelectorContext = createContext({} as CountrySelectorContextType);

export function CountrySelectorContextProvider(props: ContextProviderProps) {
    const countryApiURL = "https://restcountries.com/v3.1/region/europe";
    const [countries, setCountries] = useState<CountryItemType>([]);
    const [selected, setSelected] = useState<Country>();
    const [previous, setPrevious] = useState<Country>();

    useEffect(() => {
        async function getCountries() {
            try {
                const { data } = await axios.get<CountryNameType>(`${countryApiURL}`);
                setCountries(data.map(({ name }) => (
                    { label: name.common, value: name.common }
                )));
            } catch(error) {
                console.log(error);
            }
        }
    
        getCountries();
    }, []);

    return (
        <CountrySelectorContext.Provider value={{ countries, setCountries, selected, setSelected, previous, setPrevious }} >
            {props.children}
        </CountrySelectorContext.Provider>
    )
}