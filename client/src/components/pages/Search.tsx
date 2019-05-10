import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Subscribe } from 'unstated-typescript';

import SearchContainer from '../../containers/SearchContainer';

interface Props {}

const component: React.FC<Props> = () => {
  const x = () => {
    const x: Promise<void> = axios
      .get('/search')
      .then(res => console.log(res))
      .catch(res => console.log(res));
    return x;
  };
  useEffect(() => {
    x();
  });
  return (
    <Subscribe to={[SearchContainer]}>
      {search => <h1>this is search query: {search.state.query}</h1>}
    </Subscribe>
  );
};

export default component;
