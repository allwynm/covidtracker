import React from 'react';
import { Circle, Popup } from 'leaflet';
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

export const showDataOnMap = (data, caseType = 'cases') => {
  console.log('from util', data, caseType);
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[caseType].hex}
      fillColor={caseTypeColors[caseType].hex}
      radius={
        Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
      }
    >
      <Popup>I'm a popup</Popup>
    </Circle>
  ));
};
