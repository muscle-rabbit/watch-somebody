import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { Subscribe } from 'unstated-typescript';
import { User } from 'twitter-d';

import SearchContainer from '../../containers/SearchContainer';

interface Props {}

const component: React.FC<Props> = () => {
  const [varidatedUsers, setUser]: [
    User[] | undefined,
    React.Dispatch<User[]>
  ] = useState();
  async function getVaridatedUsers(): Promise<User[] | undefined> {
    let data;
    try {
      await axios.get<User>('/search').then(r => {
        data = r.data;
      });
    } catch (e) {
      console.error(e);
    }
    return data;
  }
  useEffect(() => {
    getVaridatedUsers().then(users => {
      if (users !== undefined) {
        setUser(users);
      }
    });
  });
  return (
    <Subscribe to={[SearchContainer]}>
      {search => (
        <div>
          <h1>this is search query: {search.state.query}</h1>
          {varidatedUsers !== undefined ? (
            varidatedUsers.map((user, i) => {
              return (
                <h1>
                  Variated User No.
                  {i}: {user.name}
                </h1>
              );
            })
          ) : (
            <h1>Varited user was not found</h1>
          )}
        </div>
      )}
    </Subscribe>
  );
};

export default component;
