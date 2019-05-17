import * as React from 'react';
import { useEffect, useState } from 'react';
import { Subscribe } from 'unstated-typescript';
import { Status as Tweet, User } from 'twitter-d';
import axios, { AxiosPromise } from 'axios';

interface Props {}

const component: React.FC<Props> = () => {
  const [tweets, useTweets] = useState();

  async function getTimeline() {
    try {
      await axios.get<Tweet[]>('/dashboard');
    } catch (error) {}
  }

  useEffect(
    () => {
      getTimeline().then(tweets => {
        useTweets(tweets);
      });
    },
    [tweets]
  );
  return <h1>This is the dashboard and target is dashboard</h1>;
};

export default component;
