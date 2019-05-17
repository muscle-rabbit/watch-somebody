import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { Subscribe } from 'unstated-typescript';
import { User } from 'twitter-d';
import { RouteComponentProps } from 'react-router-dom';

import SearchContainer from '../../containers/SearchContainer';
import Card from '../molecules/Card';
import { Button } from 'react-bootstrap';

export type GetTimeline = Pick<User, 'id_str' | 'name'>;

interface Props extends RouteComponentProps {}

const component: React.FC<Props> = ({ history }) => {
  const [varidatedUsers, setVaridatedUser]: [
    User[] | undefined,
    React.Dispatch<User[] | undefined>
  ] = useState();

  const [selectedUser, setUser]: [
    GetTimeline | undefined,
    React.Dispatch<GetTimeline | undefined>
  ] = useState();

  async function getVaridatedUsers(): Promise<User[] | undefined> {
    let data;
    try {
      await axios.get<User>('/search').then(r => {
        data = r.data;
      });
    } catch (e) {
      throw Error(e);
    }
    return data;
  }

  async function submitUser(id_str: string) {
    if (id_str === '') alert('追っかけしたい人を選択して下さい。');
    try {
      await axios.post<Pick<User, 'id_str'>>('/dashboard', { id_str: id_str });
    } catch (e) {
      throw Error(e);
    }
    history.push('/dashboard');
  }

  useEffect(
    () => {
      getVaridatedUsers().then(users => setVaridatedUser(users));
    },
    [varidatedUsers]
  );

  console.log(selectedUser);

  return (
    <Subscribe to={[SearchContainer]}>
      {search => (
        <div>
          <h1>this is search query: {search.state.query}</h1>
          <Button
            onClick={() =>
              submitUser(selectedUser !== undefined ? selectedUser.id_str : '')
            }
          >
            こいつに決めた！
          </Button>
          {selectedUser !== undefined ? selectedUser.name : 'まだ選んでないよ'}
          {varidatedUsers !== undefined ? (
            varidatedUsers.map((user, i) => {
              return (
                <Card
                  key={user.id}
                  id_str={user.id_str}
                  name={user.name}
                  screen_name={user.screen_name}
                  profile_banner_url={user.profile_banner_url}
                  profile_image_url_https={user.profile_image_url_https}
                  default_profile_image={user.default_profile_image}
                  description={user.description}
                  url={`https://twitter.com/${user.screen_name}`}
                  onSelect={setUser}
                  onSubmit={submitUser}
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
