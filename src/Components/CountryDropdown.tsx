import { useEffect, useState } from "react";
import { Select } from 'antd';
import 'antd/dist/antd.css';
import { Main, Logo, Title, Country, Info, Flag, Separator } from '../css/styles.js'
import indisponivel from '../assets/images/indisponivel.png'

type ItemType = {
  label: string;
  value: string;
}[];

type InfoType = {
  nome: string;
  id: number;
  capital?: string;
  linguas?: string;
}[];

const { Option } = Select;

export function CountryDropdown() {
  const apiURL = "https://api-postful.herokuapp.com/continentes/";
  
  const [continentItems, setContinentItems] = useState<ItemType>([]);
  const [continentInfo, setContinentInfo] = useState<InfoType>([]);

  const [countryItems, setCountryItems] = useState<ItemType>([{
    label: "Primeiro selecione o continente..", value: ""
  }]);
  const [countryInfo, setCountryInfo] = useState<InfoType>([]);

  const [flag, setFlag] = useState("");

  const [selectedCountry, setSelectedCountry] = useState<InfoType>([]);
  const [selectedContinent, setSelectedContinent] = useState<InfoType>([]);

  useEffect(() => {
    async function getContinent() {
      const response = await fetch(`${apiURL}`);
      const bodyContinent: InfoType = await response.json();

      setContinentItems(bodyContinent.map(({ nome }) => ({ label: nome, value: nome })));
      setContinentInfo(
        bodyContinent.map(({ id, nome }) => ({
          id,
          nome
        }))
      );
    }

    getContinent();
  }, []);

  async function getFlag(id: number[]) {
    const response = await fetch(`${apiURL}${selectedContinent[0].id}/paises/${id}`);
    const JSONresponse = await response.json();

    setFlag(JSONresponse.bandeira_url);
  }

  function imgError() {
    if(flag !== "") {
      setFlag(indisponivel)
    }
  }

  async function changeCountry(continente: number) {
    const response= await fetch(`${apiURL}${continente}/paises`);
    const bodyCountry: InfoType = await response.json();

    setCountryItems(bodyCountry.map(({ nome }) => ({ label: nome, value: nome })));
    setCountryInfo(
      bodyCountry.map(({ id, nome, capital, linguas }) => ({
        id,
        nome,
        capital,
        linguas,
      }))
    );
  }

  // ChangeEvent<HTMLSelectElement>
  function handleChangeCountry(value: any) {
    const selectedCountryStr: string = value;
    let selectedCountryArray: InfoType = [];

    countryInfo.forEach((inf) => {
      if (selectedCountryStr === inf.nome) {
        selectedCountryArray = [
          {
            id: inf.id,
            nome: inf.nome,
            capital: inf.capital,
            linguas: inf.linguas,
          },
        ];
      }
    });

    setSelectedCountry(selectedCountryArray);
    getFlag(selectedCountryArray.map(({ id }) => id));
  }

  async function handleChangeContinent(value: any) {
    const selectedContinentStr: string = value;
    let selectedContinentArray: InfoType = [];

    continentInfo.forEach((inf) => {
      if (selectedContinentStr === inf.nome) {
        selectedContinentArray = [
          {
            id: inf.id,
            nome: inf.nome,
          },
        ];
      }
    });

    setSelectedContinent(selectedContinentArray);
    changeCountry(selectedContinentArray[0].id);
  }

  return (
    <Main>
      <Logo
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="512.000000pt"
        height="512.000000pt"
        viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M2380 5114 c-19 -2 -78 -9 -130 -14 -524 -57 -1060 -312 -1454 -690
      -425 -408 -690 -928 -773 -1519 -26 -180 -23 -537 5 -711 26 -159 79 -364 128
      -499 44 -120 167 -372 230 -471 204 -321 503 -620 824 -824 99 -63 351 -186
      471 -230 666 -244 1418 -196 2048 130 250 129 430 263 636 469 210 209 348
      400 480 659 353 696 364 1526 28 2236 -373 790 -1124 1337 -1993 1450 -88 12
      -438 21 -500 14z m510 -228 c454 -70 868 -260 1213 -557 18 -15 -17 -52 -76
      -78 -79 -36 -101 -60 -92 -100 5 -24 12 -31 31 -31 20 0 29 -9 45 -45 l20 -44
      46 20 c25 11 47 18 48 17 1 -2 5 -26 9 -55 l6 -51 -87 1 c-49 0 -94 -2 -101
      -7 -7 -4 -30 -34 -52 -66 -39 -58 -40 -58 -99 -65 -60 -7 -60 -7 -67 -43 -3
      -21 -8 -44 -10 -53 -3 -12 4 -19 22 -23 23 -6 26 -10 20 -38 -3 -17 -7 -33 -9
      -34 -1 -1 -29 3 -62 10 -47 9 -71 9 -113 0 -30 -7 -55 -14 -57 -16 -14 -18
      -20 -73 -12 -126 8 -59 11 -63 44 -77 40 -17 159 -20 197 -5 14 5 26 16 26 24
      0 8 28 51 62 96 l62 82 41 -6 c37 -5 45 -2 70 24 34 36 43 37 51 8 4 -20 46
      -52 176 -139 5 -3 6 -13 2 -22 -4 -12 -18 -17 -45 -17 -40 0 -49 -10 -26 -28
      24 -19 59 -24 88 -12 25 11 29 18 29 50 0 21 5 40 12 42 20 7 0 26 -67 63 -55
      31 -65 42 -79 80 l-15 45 50 0 c46 0 55 -4 109 -51 53 -48 59 -56 65 -104 5
      -44 13 -58 50 -95 l44 -43 10 39 c5 22 13 52 17 67 6 27 55 63 68 50 3 -4 6
      -26 6 -49 0 -34 7 -51 31 -79 29 -33 35 -35 94 -35 l62 0 32 -88 c17 -48 31
      -93 31 -100 0 -9 -27 -12 -98 -12 l-98 0 -54 40 c-45 33 -61 40 -101 40 -68 0
      -79 -7 -79 -46 0 -29 -3 -34 -24 -34 -13 0 -29 6 -35 14 -6 8 -61 26 -121 41
      l-110 27 0 70 c0 61 -2 69 -17 64 -10 -2 -67 -8 -128 -11 -88 -6 -120 -12
      -159 -32 -43 -22 -59 -24 -120 -20 -66 4 -75 2 -138 -32 l-68 -35 0 -68 0 -67
      -120 -86 c-65 -47 -122 -90 -125 -95 -3 -5 -3 -25 1 -44 5 -28 11 -35 33 -38
      22 -3 26 -7 23 -33 -2 -16 -12 -37 -23 -47 -16 -14 -19 -30 -19 -116 l0 -99
      111 -127 110 -126 50 0 c27 0 49 5 49 10 0 6 38 10 93 10 81 0 96 3 112 20 29
      32 120 28 155 -5 22 -21 40 -27 99 -32 82 -7 77 3 62 -132 l-9 -75 83 -145 84
      -145 -46 -84 c-54 -100 -55 -143 -4 -196 30 -31 31 -35 31 -122 l0 -90 45 -62
      c44 -61 45 -63 45 -141 l0 -80 42 -3 42 -3 -119 -124 c-148 -153 -264 -251
      -420 -354 -439 -289 -973 -424 -1490 -377 -457 41 -911 225 -1270 515 -604
      486 -934 1263 -865 2030 19 206 99 539 164 680 14 29 14 28 15 -36 l1 -66 50
      -23 50 -23 0 -96 c0 -96 1 -96 46 -173 28 -49 51 -78 62 -78 9 0 27 -3 40 -6
      38 -11 29 47 -22 130 -35 56 -45 84 -50 134 -7 61 -7 62 18 62 26 0 27 -4 42
      -95 4 -26 29 -75 71 -136 l65 -97 -16 -30 c-16 -31 -15 -32 25 -94 l40 -63 87
      -22 c102 -26 122 -28 122 -10 0 10 10 12 37 8 34 -6 38 -10 38 -35 0 -28 3
      -30 80 -48 l80 -19 65 -75 c35 -42 75 -80 88 -85 13 -5 51 -9 85 -9 34 0 67
      -4 73 -8 7 -4 15 -39 19 -77 l7 -70 -59 -40 -58 -40 -6 -65 c-3 -36 -9 -85
      -13 -110 -7 -45 -7 -45 84 -158 56 -71 90 -122 90 -137 0 -29 24 -55 52 -55
      11 0 53 -23 94 -51 l74 -51 0 -204 0 -204 25 -6 c29 -7 29 -8 10 -113 l-16
      -81 42 -55 41 -54 -7 -94 -7 -93 52 -92 c40 -71 70 -108 125 -158 l73 -65 68
      3 c58 3 68 6 75 24 6 18 0 28 -42 60 -54 43 -52 33 -33 157 6 36 5 37 -23 37
      -18 0 -38 9 -51 23 l-22 23 30 29 c40 38 40 71 -1 80 -24 5 -29 11 -27 28 2
      17 12 23 48 28 25 4 76 22 114 40 59 29 74 42 99 84 16 28 60 88 97 135 l68
      85 -16 76 c-15 73 -15 77 4 110 19 33 22 34 95 39 65 4 79 9 115 38 l41 33 13
      140 13 141 45 56 c62 78 59 72 66 117 l7 41 -44 11 c-38 10 -50 20 -76 63
      l-31 50 -97 0 c-86 0 -109 4 -184 32 l-87 32 -6 59 c-3 35 -17 79 -33 108
      l-26 49 -74 0 -74 0 -41 66 c-28 45 -53 71 -79 84 -37 20 -38 20 -44 0 -5 -15
      -15 -20 -44 -20 -21 0 -51 -2 -67 -5 -25 -5 -33 0 -56 33 -25 36 -32 40 -99
      52 -68 12 -74 11 -88 -7 -9 -10 -35 -41 -58 -68 l-42 -49 -78 13 c-115 18
      -113 17 -113 59 0 20 -3 67 -6 104 l-7 67 -68 11 -68 12 28 51 c29 53 30 105
      2 99 -7 -1 -46 -25 -86 -52 -58 -39 -83 -50 -114 -50 -60 0 -85 14 -105 57
      -21 48 -12 94 37 186 28 54 37 62 109 98 l79 40 132 -3 132 -3 3 -43 c3 -38 7
      -44 42 -62 22 -11 42 -20 45 -20 3 0 5 33 5 73 0 71 1 74 38 109 20 20 64 53
      97 73 70 44 85 60 85 93 0 38 130 166 218 214 39 22 72 45 72 52 0 7 24 33 54
      58 51 45 54 46 81 32 25 -13 28 -12 45 9 18 22 18 22 -21 30 -31 7 -39 13 -39
      31 0 30 18 46 51 46 28 0 59 -22 59 -42 0 -16 103 -1 116 17 6 8 19 15 28 15
      21 0 22 -46 1 -54 -8 -3 -15 -16 -15 -30 0 -21 9 -27 62 -45 85 -29 98 -28 98
      9 0 26 -6 32 -50 51 -27 12 -50 28 -50 36 0 8 18 22 40 30 38 15 40 18 40 57
      0 38 -3 43 -45 68 l-45 28 0 65 c0 36 -2 65 -5 65 -3 0 -28 -11 -55 -25 -27
      -14 -63 -25 -80 -25 l-31 0 7 49 6 50 -43 11 c-24 6 -61 16 -81 21 -73 19
      -106 -19 -110 -125 l-3 -78 -63 -20 c-61 -18 -63 -20 -87 -73 -20 -46 -28 -55
      -49 -55 -25 0 -26 2 -26 64 l0 65 -57 6 c-79 10 -117 34 -132 86 -7 24 -9 45
      -4 50 21 21 195 118 239 133 63 21 62 21 69 -17 6 -30 9 -33 36 -29 16 2 29
      10 29 18 0 8 14 17 30 21 33 6 39 17 15 27 -28 10 -17 36 15 36 20 0 42 11 68
      34 32 29 49 36 112 45 41 5 80 6 89 1 20 -10 56 -49 50 -54 -2 -2 -36 -20 -76
      -40 -39 -19 -74 -40 -77 -45 -3 -5 38 -19 92 -31 53 -12 102 -24 108 -27 6 -2
      17 14 24 37 13 40 13 40 65 40 46 0 53 3 66 28 7 15 15 30 17 33 1 4 -13 10
      -33 13 -34 7 -35 9 -35 50 l0 42 -110 49 c-108 47 -111 47 -182 41 -45 -5 -90
      -17 -121 -33 l-50 -25 7 -53 6 -54 -37 5 c-58 8 -60 10 -65 43 -4 26 1 35 34
      61 21 17 36 35 33 41 -9 14 -158 11 -177 -3 -9 -7 -19 -23 -22 -35 -6 -18 -2
      -22 21 -25 23 -2 27 -7 25 -28 -5 -32 -1 -30 -60 -37 -38 -4 -52 -10 -55 -24
      -4 -16 -15 -19 -75 -19 -75 0 -82 5 -82 56 0 22 4 24 53 24 49 0 56 3 96 44
      43 44 43 44 21 56 -19 10 -26 8 -54 -19 -26 -26 -40 -31 -78 -31 -43 0 -49 3
      -84 45 -36 45 -37 45 -101 45 -62 0 -68 -2 -130 -47 l-65 -48 60 -3 c66 -3 83
      -20 54 -54 -14 -17 -11 -18 51 -18 55 0 68 -3 77 -19 5 -11 10 -22 10 -25 0
      -3 -33 -6 -74 -6 -65 0 -75 2 -81 19 -6 20 -15 24 -75 36 -19 4 -41 12 -49 19
      -8 6 -44 13 -80 16 l-66 5 105 68 c328 212 697 335 1120 371 88 8 386 -4 480
      -18z m-1570 -543 c0 -34 -30 -53 -87 -53 -50 0 -53 1 -53 25 0 20 5 25 25 25
      14 0 25 5 25 10 0 6 20 10 45 10 35 0 45 -4 45 -17z m-2 -135 c-3 -21 -9 -23
      -65 -26 -50 -2 -63 0 -63 12 0 15 54 33 103 35 24 1 28 -3 25 -21z m3012 -108
      l52 -60 -22 -35 -22 -36 -81 3 c-100 4 -112 20 -40 58 47 25 48 26 51 78 2 28
      5 52 7 52 1 0 26 -27 55 -60z m-2826 -129 c3 -5 3 -23 0 -39 -5 -23 -14 -34
      -37 -41 -17 -6 -31 -10 -32 -9 -2 2 -10 18 -20 37 -17 33 -17 35 1 48 20 15
      80 18 88 4z m-960 -241 c-57 -74 -55 -64 5 40 19 32 27 40 29 27 2 -10 -13
      -40 -34 -67z m1156 65 c0 -8 5 -15 10 -15 6 0 10 -11 10 -25 0 -24 -2 -25 -69
      -25 -83 0 -123 12 -115 35 15 37 164 65 164 30z m74 -34 c16 -17 16 -19 -4
      -24 -16 -4 -20 0 -20 19 0 29 2 29 24 5z m106 -61 c0 -5 -5 -12 -11 -16 -14
      -8 -33 11 -25 25 7 11 36 4 36 -9z m-230 5 c0 -13 -85 -125 -94 -125 -43 1
      -42 55 2 103 18 19 36 27 59 27 18 0 33 -2 33 -5z m140 -14 c0 -22 -35 -51
      -62 -51 -14 0 -18 8 -18 35 0 34 1 35 40 35 33 0 40 -3 40 -19z m71 -43 c31
      -9 39 -16 39 -35 0 -20 -5 -23 -39 -23 -40 0 -51 11 -51 51 0 22 1 22 51 7z
      m-91 -50 c0 -35 -29 -58 -72 -58 -36 0 -39 2 -32 23 3 12 7 22 8 22 0 0 15 8
      31 17 42 24 65 23 65 -4z m2908 -23 c29 -59 28 -65 -8 -65 -30 0 -30 1 -30 55
      0 30 4 55 8 55 4 0 18 -20 30 -45z"
          />
          <path
            d="M3680 4113 c-21 -7 -40 -33 -40 -54 0 -10 20 -32 45 -49 43 -30 62
      -70 33 -70 -24 0 -36 -15 -43 -54 l-8 -39 82 6 c69 4 84 9 101 29 25 30 25 30
      -9 50 -17 9 -41 34 -54 55 -24 38 -29 52 -41 106 -6 27 -28 34 -66 20z"
          />
          <path
            d="M3582 4011 c-14 -3 -34 -26 -49 -52 -48 -83 -6 -105 84 -43 39 27 53
      43 53 60 0 36 -35 50 -88 35z"
          />
          <path
            d="M2356 3715 c-3 -9 -19 -15 -41 -15 -28 0 -36 -4 -33 -16 2 -9 10 -21
      19 -27 21 -13 69 -1 69 18 0 9 11 20 25 25 14 5 25 14 25 20 0 16 -57 12 -64
      -5z"
          />
          <path
            d="M2202 3688 c-22 -22 -14 -48 13 -48 18 0 25 5 25 19 0 26 -23 44 -38
      29z"
          />
        </g>
      </Logo>
      <Title>CountryInfo</Title>
      <Select
        showSearch
        style={{ "width": "250px" }}
        placeholder="Selecione um continente"
        optionFilterProp="children"
        onChange={handleChangeContinent}
      >
        {continentItems.map(({ label, value }) => (
          <Option key={value} value={value}>
            {" "}
            {label}{" "}
          </Option>
        ))}
      </Select>
      <Separator />
      <Select
        showSearch
        style={{ "width": "250px" }}
        placeholder="Selecione um país"
        optionFilterProp="children"
        onChange={handleChangeCountry}
      >
        {countryItems.map(({ label, value }) => (
          <Option key={value} value={value}>
            {" "}
            {label}{" "}
          </Option>
        ))}
      </Select>

      <div>
        {selectedCountry.map(({ id, nome, capital, linguas }) => (
          <div key={id}>
            <Country>{nome}</Country>
            <Info>
              Capital: <span>{capital}</span>
            </Info>
            <Flag
              src={flag}
              alt="Bandeira indisponível"
              height="100px"
              onError={imgError}
            ></Flag>
            <Info style={{"marginTop": "10px"}}>
              Línguas Faladas: <span>{linguas}</span>
            </Info>
          </div>
        ))}
      </div>
    </Main>
  );
}