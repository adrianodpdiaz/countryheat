import { Button } from 'antd';
import 'antd/dist/antd.css';
import { useContext } from 'react';
import { RandomCountryContext } from '../contexts/RandomCountryContext';
import { CountrySelectorContext } from '../contexts/CountrySelectorContext';
import { ScoreContext } from '../contexts/ScoreContextProvider';
import { countryApiURL, toCountryObject } from '../general/GeneralFunctions';
import { GameOverContext } from '../contexts/GameOverContextProvider';
import { CountryItemType, CountryNameType } from '../general/Interfaces';
import axios from 'axios';

export function Compare() {
    const { randomCountry, setRandomCountry } = useContext(RandomCountryContext);
    const { selected, setSelected, countries, setCountries } = useContext(CountrySelectorContext);
    const { score, setScore } = useContext(ScoreContext);
    const { setGameOver } = useContext(GameOverContext);

    /**
     * Gets the full list of european countries from the API
     */
    async function getCountriesFromTheAPI() {
        try {
            const { data } = await axios.get<CountryNameType>(`${countryApiURL}`);
            setCountries(data.map(({ name }) => (
                { label: name.common, value: name.common }
            )));
        } catch(error) {
            console.log(error);
        }
    }

    function handleCompare() {
        // Right choice
        if((selected?.capital.temperature !== undefined) && (randomCountry?.capital.temperature !== undefined)
            && (selected?.capital.temperature > randomCountry?.capital.temperature)) {
                setScore(score + 100);

                // The component with +100 label shows up below the score
                let selectedTemperature = document.getElementById("selectedTemperature");
                //@ts-ignore
                selectedTemperature.style.display = "block";

                // Creates a new Select element without the countries already used
                const noSelectedCountries: CountryItemType = [];
                countries?.forEach((ct) => {
                    if(ct.label !== selected.name) {
                        noSelectedCountries.push(ct);
                    }
                })
                setCountries(noSelectedCountries);
        } else if((selected?.capital.temperature !== undefined) && (randomCountry?.capital.temperature !== undefined)
            && (selected?.capital.temperature <= randomCountry?.capital.temperature)) {
                setScore(0);
                setGameOver(true);

                toCountryObject("random").then((response) => {
                    setRandomCountry({
                        name: response.name,
                        capital: {
                            city: response.capital.city,
                            temperature: response.capital.temperature
                        }
                    });
                });

                getCountriesFromTheAPI();
        }

        setSelected({
            name: undefined,
            capital: {}
        });

        console.log(randomCountry);
        console.log(selected);
    }

    return (
            <Button
                type="primary"
                // style={{ "marginTop": "15px", "width": "110px"}}
                onClick={handleCompare}
                >
                Compare
            </Button>
    )

}