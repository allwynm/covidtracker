import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import '../style/infobox.scss';

function InfoBox({ isRed, caseType, active, onClick, title, cases, total }) {
  console.log('infobox', isRed, caseType, active, onClick, title, cases, total);
  return (
    <Card
      className={`infobox ${isRed && 'infobox--danger'} ${
        active && (isRed ? 'infobox--active' : 'infobox--activegreen')
      }`}
      onClick={onClick}
    >
      <CardContent>
        <Typography className='infobox__title'>{title}</Typography>
        <h4 className={`infobox__cases ${!isRed && 'infobox--greentext'}`}>
          {cases}
        </h4>
        <Typography className='infobox__total'>{`${total} Total`}</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
