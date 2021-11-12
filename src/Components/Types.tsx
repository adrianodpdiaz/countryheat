export type CountrySelectorProps = {
    showSearch: boolean;
    style: object;
    placeholder: string;
    optionFilterProp: string;
    onChange: (value: string) => void;
}

export type ItemType = {
    label: string;
    value: string;
}[];

export type ResponseInfoType = {
    name: {
        common: string
    }
}[];