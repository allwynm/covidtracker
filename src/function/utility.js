import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

const caseTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  return data.slice(0).sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const formatNumber = (number) => {
  return number ? `+${numeral(number).format('0.0a')}` : `+0`;
};

export const showDataOnMap = (data, casesType = 'cases') => {
  return data.map((country) => (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={caseTypeColors[casesType].hex}
      fillColor={caseTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className='info-container'>
          <div
            className='info-flag'
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className='info-name'>{country.country}</div>
          <div className='info-confirmed'>
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className='info-recovered'>
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className='info-deaths'>
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};
