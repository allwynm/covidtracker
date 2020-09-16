import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.scss';
import InfoBox from './component/InfoBox';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Worldwide');
  const [selectedCountryData, setSelectedCountryData] = useState({});

  useEffect(() => {
    const getCountryData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          // const countries = data.map((country) => {
          //   const data = {
          //     country: country.country,
          //     countryISO2: country.countryInfo.iso2,
          //   };
          //   return data;
          // });
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
      .then((data) => setSelectedCountryData(data));

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
        <div className='app__map'>I m a map</div>
      </div>
      <Card className='app__right'>
        <CardContent className='app__rightbody'>
          <h3>Cases By Country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
