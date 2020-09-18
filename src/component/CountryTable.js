import React from 'react';
import numeral from 'numeral';

import '../style/countrytable.scss';

function CountryTable({ countries }) {
  return (
    <table className='countrytable'>
      <tbody>
        {countries.map((data) => (
          <tr className='countrytable__row' key={data.country}>
            <td className='countrytable__name'>
              <img
                src={data.countryInfo.flag}
                alt='flag'
                className='countrytable__flag'
              />{' '}
              {data.country}
            </td>
            <td className='countrytable__cases'>
              <strong>{numeral(data.cases).format('0,0')}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryTable;
