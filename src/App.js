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
import { sortData } from './function/utility';
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

    fetch(`https://disease.sh/v3/covid-19/countries/${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountryData(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
    setSelectedCountry(countryName);
  };

  console.log(selectedCountryData);
  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h2>Covid 19 Tracker</h2>
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
            title='Coranavirus Cases'
            cases={selectedCountryData.todayCases}
            total={selectedCountryData.cases}
          />
          <InfoBox
            title='Recovered Cases'
            cases={selectedCountryData.todayRecovered}
            total={selectedCountryData.recovered}
          />
          <InfoBox
            title='Deaths'
            cases={selectedCountryData.todayDeaths}
            total={selectedCountryData.deaths}
          />
        </div>
        <div className='app__map'>
          <Map
            zoom={mapZoom}
            center={mapCenter}
            countries={countries}
            caseType='cases'
          />
        </div>
      </div>
      <Card className='app__right'>
        <CardContent className='app__rightbody'>
          <h4>Cases By Country</h4>
          <CountryTable countries={sortData(countries)} />
          <h4>Worldwide new cases</h4>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
