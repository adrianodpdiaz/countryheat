import { Alert } from 'antd';
import { useContext } from 'react';
import worldImg from '../assets/images/earth.svg'
import { Compare } from '../components/Compare';
import { CountrySelector } from '../components/CountrySelector'
import { GameOver } from '../components/GameOver';
import { toCountryObject } from '../general/GeneralFunctions';
import { RandomCountry } from '../components/RandomCountry'
import { Score } from '../components/Score';
import { CountrySelectorContext } from '../contexts/CountrySelectorContext';
import { GameOverContext } from '../contexts/GameOverContextProvider';

export function Home() {
    const { selected, setSelected, previous, setPrevious } = useContext(CountrySelectorContext);
    const { gameOver } = useContext(GameOverContext);

    function handleCountrySelection(value: any) {
        toCountryObject(value).then((response) => {
            setSelected({
                name: response.name,
                capital: {
                    city: response.capital.city,
                    temperature: response.capital.temperature
                }
            });
            setPrevious({
                name: response.name,
                capital: {
                    city: response.capital.city,
                    temperature: response.capital.temperature
                }
            });
        });

        let selectedTemperature = document.getElementById("selectedTemperature")!;
        selectedTemperature.style.display = "none";
    }

    return (
        <div>
            <main>
                <img src={worldImg} alt="Representation of the Earth" />
                <h1>CountryHeat</h1>
                <div className="random">
                    <RandomCountry/>
                </div>
                <CountrySelector
                    value={selected?.name}
                    showSearch
                    style={{ "width": "250px", "marginTop": "15px" }}
                    placeholder="Select a country to compare"
                    optionFilterProp="children"
                    onChange={handleCountrySelection}
                ></CountrySelector>
                <Compare></Compare>
                <Score></Score>
                <div id="selectedTemperature">
                <Alert
                        message="+100"
                        description={"Temperature in " + previous?.capital.city + " - "
                            + previous?.name + ": " +previous?.capital.temperature + " °C"}
                        type="success"
                        showIcon
                    />
                </div>
                {gameOver && <GameOver />}
            </main>
        </div>
    )
}