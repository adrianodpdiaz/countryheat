import { Select } from 'antd';
import 'antd/dist/antd.css';
import { useContext } from 'react';
import { CountrySelectorContext } from '../contexts/CountrySelectorContext';
import { CountrySelectorProps } from '../general/Interfaces';

const { Option } = Select;

export function CountrySelector(props: CountrySelectorProps) {
    const { countries } = useContext(CountrySelectorContext);

    return (
        <label>
            <Select {...props}>
                {countries?.sort((a,b) => {
                    if (a.value > b.value) {
                        return 1;
                      }
                      if (a.value < b.value) {
                        return -1;
                      }
                      return 0;
                }).map(({ label, value }) => (
                    <Option key={value} value={value}>
                        {" "}
                        {label}{" "}
                    </Option>
                ))}
            </Select>
        </label>
    )
}