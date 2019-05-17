import * as React from 'react';
import { useEffect, useState } from 'react';
import { Subscribe } from 'unstated-typescript';
import { Status as ITweet, User } from 'twitter-d';
import axios, { AxiosPromise } from 'axios';

import Tweet from '../organism/Tweet';

interface Props {}

const component: React.FC<Props> = () => {
  const [tweets, useTweets]: [
    ITweet[] | undefined,
    React.Dispatch<ITweet[] | undefined>
  ] = useState();

  async function getTimeline(): Promise<ITweet[] | undefined> {
    let data;
    try {
      await axios.get<ITweet[]>('/dashboard').then(r => {
        data = r.data;
      });
    } catch (e) {
      throw Error(e);
    }
    return data;
  }

  useEffect(
    () => {
      getTimeline().then(tweets => {
        useTweets(tweets);
      });
    },
    [tweets]
  );
  return (
    <>
      {tweets !== undefined
        ? tweets.map(tweet => (
            <Tweet
              name={tweet.user.name}
              screen_name={tweet.user.screen_name}
              profile_image_url_https={tweet.user.profile_image_url_https}
              url={`https://twitter.com/${tweet.user.screen_name}`}
              text={tweet.full_text}
              favorite_count={tweet.favorite_count}
              created_at={tweet.created_at}
            />
          ))
        : 'Any tweets not found.'}
    </>
  );
};

export default component;
