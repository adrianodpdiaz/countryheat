import { Select } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { CountrySelectorProps, ItemType, ResponseInfoType } from './Types';

const { Option } = Select;

export function CountrySelector(props: CountrySelectorProps) {
    const apiURL = "https://restcountries.com/v3.1/region/europe";
    const [countryItems, setCountryItems] = useState<ItemType>([]);

    useEffect(() => {
        async function getCountries() {
            try {
                const { data } = await axios.get<ResponseInfoType>(`${apiURL}`);
                setCountryItems(data.map(({ name }) => (
                    { label: name.common, value: name.common }
                )));
            } catch(error) {
                console.log(error);
            }
        }
    
        getCountries();
    }, []);

    return (
        <Select {...props}>
            {countryItems.map(({ label, value }) => (
                <Option key={value} value={value}>
                    {" "}
                    {label}{" "}
                </Option>
            ))}
        </Select>
    )
}