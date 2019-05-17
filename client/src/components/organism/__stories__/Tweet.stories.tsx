import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Tweet from '../Tweet';

storiesOf('Tweet', module).add('with text', () => (
  <Tweet
    name={'shinzooon'}
    screen_name={'itstoolatetodo'}
    url={'https://twitter.com/itstoolatetoact'}
    text={'hello world'}
    favorite_count={10}
    created_at={'Wed Oct 10 20:19:24 +0000 2018'}
    profile_image_url_https={
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKZYhXzwqx_VLN5b9YApC4s7WhoWMMlDyGaRm8YxqWgMhn7lK'
    }
  />
));
