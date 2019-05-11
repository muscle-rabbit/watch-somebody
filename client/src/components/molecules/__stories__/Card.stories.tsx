import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Card from '../Card';

storiesOf('Button', module).add('with text', () => (
  <Card
    name={'shinyamizuno'}
    screen_name={'shinzooon'}
    default_profile_image={true}
    url={'https://twitter.com/itstoolatetoact'}
    profile_banner_url={
      'https://pbs.twimg.com/profile_banners/131742114/1555327888/1500x500'
    }
    description={
      "I'm shinya mizunoI'm shinya mizunoI'm shinya mizunoI'm shinya mizunoI'm shinya mizunoI'm shinya mizunoI'm shinya mizuno"
    }
    profile_image_url_https={
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxSTCyyeJoUsPg5hrbECNc9bLKv-_2ktMPtJ5spF3Ej6_AKUxv'
    }
  />
));
