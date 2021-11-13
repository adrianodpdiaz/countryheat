import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Country {
    name: string | undefined;
    capital: {
        city?: string,
        temperature?: number
    };
}

export interface ContextProviderProps {
    children: ReactNode;
}

export interface RandomCountryContextType {
    randomCountry: Country | undefined;
    setRandomCountry: Dispatch<SetStateAction<Country | undefined>>;
}

export interface CountrySelectorContextType {
    countries: CountryItemType | undefined;
    setCountries: (Dispatch<SetStateAction<CountryItemType>>);
    selected: Country | undefined;
    setSelected: Dispatch<SetStateAction<Country | undefined>>;
    previous: Country | undefined;
    setPrevious: Dispatch<SetStateAction<Country | undefined>>;
}

export interface ScoreContextType {
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
}

export interface GameOverContextType {
    gameOver: boolean;
    setGameOver: Dispatch<SetStateAction<boolean>>;
}

export type CountryItemType = {
    label: string;
    value: string;
}[];

export type CountryNameType = {
    name: {
        common: string;
    }
}[];

export type CountrySelectorProps = {
    value: string | undefined;
    showSearch: boolean;
    style: object;
    placeholder: string;
    optionFilterProp: string;
    onChange: (value: string) => void;
}

export interface CountryResponse {
    name: {
        common: string;
    },
    capital: string
};