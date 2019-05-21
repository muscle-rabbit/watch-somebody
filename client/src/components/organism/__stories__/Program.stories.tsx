import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Program from '../Program';

storiesOf('Program', module).add('with text', () => {
  const o = {
    begin: '1976-04-19T12:59-0500',
    until: '1976-04-19T18:59-0500'
  };
  const b = {
    category: 'ちくしょうバラエテイ',
    subcategory: '腹がよじれるほど'
  };
  return (
    <Program
      title={'shinyaaaa'}
      schedule={o}
      description={'intersting programs'}
      genre={b}
      station={'TV mie'}
    />
  );
});
