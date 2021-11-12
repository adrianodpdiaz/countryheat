import { ReactNode } from "react";

export interface Country {
    name: object,
    capital?: [
        string
    ]
}

export interface Name {
    common: string;
    official?: string;
    nativeName?: string;
}

export interface DataContextProviderProps {
    children: ReactNode
}