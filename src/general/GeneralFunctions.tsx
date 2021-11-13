import axios, { AxiosResponse } from "axios";
import { Country, CountryResponse } from "./Interfaces";

export function toCelsius(kelvin: number) {
    return Number((kelvin - 273.15).toFixed(2));
}

export const countryApiURL = "https://restcountries.com/v3.1/region/europe";

export async function toCountryObject(country: string) {
    let temp: Country = {
        name: '',
        capital: {
            city: '',
            temperature: 0
        }
    };
    
    try{
        if(country === "random") {
            let randomNumber = Math.floor(Math.random()*52);
            await axios.get<Country>(`${countryApiURL}`).then((response: AxiosResponse) => {
                const random = response.data[randomNumber];
                temp = {
                    name: random.name.common,                 
                    capital: {
                        city: random.capital[0]
                    } 
                };
            });
        } else {
            await axios.get<Country>(`${countryApiURL}`).then((response: AxiosResponse) => {
                response.data.forEach((ct: CountryResponse) => {
                    if (country === ct.name.common) {
                        temp = {
                            name: ct.name.common,                 
                            capital: {
                                city: ct.capital,
                                temperature: 0
                            } 
                        }
                    }
                });
            });
        }
    
        const tempApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${temp.capital.city}&appid=2a37e727ac28a9d873aa947610c28aae`;
        await axios.get<Country>(`${tempApiURL}`).then((response: AxiosResponse) => {
            const temperature = toCelsius(response.data.main.temp);
            temp = {
                name: temp.name,                 
                capital: {
                    city: temp.capital.city,
                    temperature: temperature
                } 
            };
        });
    } catch(error) {
        console.log(error);
        throw new Error();
    }
    
    return temp;
}