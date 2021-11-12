import { createContext, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Country, DataContextProviderProps } from "../components/Interfaces";

export const DataContext = createContext({} as any);

export function DataContextProvider(props: DataContextProviderProps) {
    const countryApiURL = "https://restcountries.com/v3.1/region/europe";
    const name = 'Saint%20Helier';
    const tempApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2a37e727ac28a9d873aa947610c28aae`;
    console.log(tempApiURL);

    const [countryItems, setCountryItems] = useState<Array<Country[]>>([]);
    const [temperature, setTemperature] = useState<Array<Country[]>>([]);
    const [randomCountry, setRandomCountry] = useState("");
    const [randomCountryCapital, setRandomCountryCapital] = useState("");
    
    useEffect(() => {
        async function getCountries(randomNumber: number) {
            await axios.get<Country>(`${countryApiURL}`).then((response: AxiosResponse) => {
                setCountryItems(response.data);
    
                const random = response.data[randomNumber];
                setRandomCountry(random.name.common);
                setRandomCountryCapital(random.capital)
            }).then((resp) => {
                async function getTemp() {
                    await axios.get<Country>(`${tempApiURL}`).then((response: AxiosResponse) => {
                        setTemperature(response.data.main.temp);
                    });
                }
                getTemp();
            });
        }

        let randomNumber = Math.floor(Math.random()*countryItems.length);
        getCountries(randomNumber);
    }, [countryItems.length]);

    return (
        <DataContext.Provider value={{ countryItems, setCountryItems, randomCountry, setRandomCountry,
            randomCountryCapital, setRandomCountryCapital, temperature }} >
            {props.children}
        </DataContext.Provider>
    )
}