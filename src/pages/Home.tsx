import worldImg from '../assets/images/earth.svg'
import { Compare } from '../components/Compare';
import { CountrySelector } from '../components/CountrySelector'
import { RandomCountry } from '../components/RandomCountry'


export function Home() {
    return (
        <div>
            <main>
                <img src={worldImg} alt="Representation of the Earth" />
                <h1>CountryHeat</h1>
                <RandomCountry/>
                <CountrySelector
                    showSearch
                    style={{ "width": "250px" }}
                    placeholder="Select the country"
                    optionFilterProp="children"
                    onChange={handleCountryChange}
                ></CountrySelector>
                <Compare></Compare>
            </main>
        </div>
    )

    async function handleCountryChange(value: any) {
        return;
    }
}