import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { Subscribe } from 'unstated-typescript';
import { User } from 'twitter-d';

import SearchContainer from '../../containers/SearchContainer';
import Card from '../molecules/Card';

interface Props {}

const component: React.FC<Props> = () => {
  const [varidatedUsers, setUser]: [
    User[] | undefined,
    React.Dispatch<User[] | undefined>
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
  getVaridatedUsers().then(users => setUser(users));
  return (
    <Subscribe to={[SearchContainer]}>
      {search => (
        <div>
          <h1>this is search query: {search.state.query}</h1>
          {varidatedUsers !== undefined ? (
            varidatedUsers.map((user, i) => {
              return (
                <Card
                  key={user.id}
                  name={user.name}
                  screen_name={user.screen_name}
                  profile_banner_url={user.profile_banner_url}
                  profile_image_url_https={user.profile_image_url_https}
                  default_profile_image={user.default_profile_image}
                  description={user.description}
                  url={`https://twitter.com/${user.screen_name}`}
                />
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
