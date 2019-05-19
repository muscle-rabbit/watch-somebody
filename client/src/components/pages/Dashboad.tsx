import * as React from 'react';
import { useState } from 'react';
import { Subscribe } from 'unstated-typescript';
import { Status as ITweet, User } from 'twitter-d';
import axios, { AxiosPromise } from 'axios';

import Tweet from '../organism/Tweet';
import ProgramsContainer from '../../containers/ProgramsContainer';
import TwitterTimeLineContainer from '../../containers/TwitterTimeLineContainer';

interface Props {}

const component: React.FC<Props> = () => {
  return (
    <Subscribe to={[TwitterTimeLineContainer, ProgramsContainer]}>
      {(timeline, programs) => (
        <>
          {timeline.state.timeline.map(tweet => (
            <Tweet
              name={tweet.user.name}
              screen_name={tweet.user.screen_name}
              profile_image_url_https={tweet.user.profile_image_url_https}
              url={`https://twitter.com/${tweet.user.screen_name}`}
              text={tweet.full_text}
              favorite_count={tweet.favorite_count}
              created_at={tweet.created_at}
            />
          ))}
          {programs.state.programs.map(program => (
            <p>{program.title}</p>
          ))}
        </>
      )}
    </Subscribe>
  );
};

export default component;
