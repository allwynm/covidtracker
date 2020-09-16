import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import '../style/infobox.scss';

function InfoBox({ title, cases, total }) {
  return (
    <Card>
      <CardContent className='info'>
        <Typography className='info__title'>{title}</Typography>
        <h4 className='info__cases'>{cases}</h4>
        <Typography className='info__total'>{`${total} Total`}</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
