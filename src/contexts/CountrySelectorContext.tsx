import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ContextProviderProps, CountrySelectorContextType, CountryItemType, CountryNameType, Country } from "../general/Interfaces";
import { EU_URL } from "../general/GeneralFunctions";

export const CountrySelectorContext = createContext({} as CountrySelectorContextType);

export function CountrySelectorContextProvider(props: ContextProviderProps) {
    const [countries, setCountries] = useState<CountryItemType>([]);
    const [selected, setSelected] = useState<Country>();
    const [previous, setPrevious] = useState<Country>();

    useEffect(() => {
        async function getCountries() {
            try {
                const { data } = await axios.get<CountryNameType>(EU_URL);
                setCountries(data.map(({ name }) => (
                    { label: name.common, value: name.common }
                )));
            } catch(error) {
                console.log(error);
                throw new Error();
            }
        }
    
        getCountries();
    }, []);

    return (
        <CountrySelectorContext.Provider value={{ 
            countries, setCountries, selected, setSelected, previous, setPrevious }}
        >
            {props.children}
        </CountrySelectorContext.Provider>
    )
}