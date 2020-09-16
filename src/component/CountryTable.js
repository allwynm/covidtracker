import React from 'react';
import '../style/countrytable.scss';
function CountryTable({ countries }) {
  console.log('tables', countries);
  return (
    <div className='countrytable'>
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
            <td className='countrytable__cases'>{data.cases}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default CountryTable;
