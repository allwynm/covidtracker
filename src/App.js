import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.scss';
import CountryTable from './component/CountryTable';
import InfoBox from './component/InfoBox';
import LineGraph from './component/LineGraph';
import Map from './component/Map';
import { formatNumber, sortData } from './function/utility';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Worldwide');
  const [selectedCountryData, setSelectedCountryData] = useState({});
  const [mapCenter, setMapCenter] = useState({
    lat: 20.59746,
    lng: 78.4796,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [caseType, setCaseType] = useState('cases');

  useEffect(() => {
    const getCountryData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);
        });
    };
    getCountryData();
  }, []);
  useEffect(() => {
    const getWorldwideData = async () => {
      await fetch('https://disease.sh/v3/covid-19/all')
        .then((response) => response.json())
        .then((data) => setSelectedCountryData(data));
    };
    getWorldwideData();
  }, []);

  const onChangeCountry = (e) => {
    const countryName = e.target.value;
    if (countryName === 'Worldwide') {
      setMapCenter([20.59746, 78.4796]);
    } else {
      fetch(`https://disease.sh/v3/covid-19/countries/${countryName}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedCountryData(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        });
    }
    setMapZoom(4);
    setSelectedCountry(countryName);
  };

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>Covid 19 Tracker</h1>
          <FormControl>
            <Select
              variant='outlined'
              value={selectedCountry}
              onChange={onChangeCountry}
              className='app__dropdown'
            >
              <MenuItem value='Worldwide'>Worldwide</MenuItem>
              {countries.map((data) => {
                return (
                  <MenuItem key={data.country} value={data.country}>
                    {data.country}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className='app__infoitems'>
          <InfoBox
            isRed
            active={caseType === 'cases'}
            title='Coranavirus Cases'
            onClick={() => setCaseType('cases')}
            cases={formatNumber(selectedCountryData.todayCases)}
            total={formatNumber(selectedCountryData.cases)}
          />
          <InfoBox
            isRed={false}
            active={caseType === 'recovered'}
            onClick={(e) => setCaseType('recovered')}
            title='Recovered Cases'
            cases={formatNumber(selectedCountryData.todayRecovered)}
            total={formatNumber(selectedCountryData.recovered)}
          />
          <InfoBox
            isRed
            active={caseType === 'deaths'}
            onClick={(e) => setCaseType('deaths')}
            title='Deaths'
            cases={formatNumber(selectedCountryData.todayDeaths)}
            total={formatNumber(selectedCountryData.deaths)}
          />
        </div>
        <div className='app__map'>
          <Map
            zoom={mapZoom}
            center={mapCenter}
            countries={countries}
            caseType={caseType}
          />
        </div>
      </div>
      <Card className='app__right'>
        <CardContent className='app__rightbody'>
          <h4>Cases By Country</h4>
          <CountryTable countries={sortData(countries)} />
          <h4>Worldwide new {caseType}</h4>
          <LineGraph caseType={caseType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
