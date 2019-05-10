import * as React from 'react';
import { useEffect } from 'react';
import { Subscribe } from 'unstated-typescript';
import { Status as Tweet, User } from 'twitter-d';
import axios, { AxiosPromise } from 'axios';

interface Props {}

const component: React.FC<Props> = () => {
  return <h1>This is the dashboard and target is dashboard</h1>;
};

export default component;
