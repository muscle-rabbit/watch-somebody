import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse, AxiosPromise } from 'axios';
import { Subscribe } from 'unstated-typescript';
import { User, Status as ITweet } from 'twitter-d';
import { RouteComponentProps } from 'react-router-dom';

import SearchContainer from '../../containers/SearchContainer';
import TwitterUsersContainer from '../../containers/TwitterUsersContainer';
import ProgramsContainer from '../../containers/ProgramsContainer';
import TwitterTimeLineContainer from '../../containers/TwitterTimeLineContainer';
import Card from '../molecules/Card';
import { Button } from 'react-bootstrap';

export type GetTimeline = Pick<User, 'screen_name' | 'name'>;

interface Props extends RouteComponentProps {}

const component: React.FC<Props> = ({ history }) => {
  const [selectedUser, setUser]: [
    GetTimeline | undefined,
    React.Dispatch<GetTimeline | undefined>
  ] = useState();

  async function submitUser(
    target_name: string,
    screen_name: string,
    timelineCallback: (tweets: ITweet[]) => void,
    programsCallback: (any: any[]) => void
  ) {
    if (screen_name === '') alert('追っかけしたい人を選択して下さい。');
    try {
      // await axios.post<Pick<User, 'screen_name'>>(
      //   `/page/dashboard/timeline?q=${screen_name}`,
      //   {
      //     screen_name: screen_name
      //   }
      // );
      await axios
        .get<ITweet[]>(`/page/dashboard/fetch/timeline/?q=${screen_name}`)
        .then(r => {
          console.log('this is timeline data.', r.data);
          timelineCallback(r.data);
        });
      await axios
        .get<any[]>(`/page/dashboard/fetch/programs/?q=${target_name}`)
        .then(r => {
          console.log('this is program data.', r.data);
          programsCallback(r.data);
        });
    } catch (e) {
      throw Error(e);
    }
    history.push('/dashboard');
  }

  return (
    <Subscribe
      to={[
        SearchContainer,
        TwitterUsersContainer,
        ProgramsContainer,
        TwitterTimeLineContainer
      ]}
    >
      {(search, twitter, programs, timeline) => {
        return (
          <div>
            <h1>this is search query: {search.state.query}</h1>
            <Button
              onClick={() =>
                submitUser(
                  search.state.query,
                  selectedUser !== undefined ? selectedUser.screen_name : '',
                  timeline.setTimeline,
                  programs.setUsers
                )
              }
            >
              こいつに決めた！
            </Button>
            {selectedUser !== undefined
              ? selectedUser.name
              : 'まだ選んでないよ'}
            {twitter.state !== undefined ? (
              twitter.state.users.map((user, i) => {
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
                  />
                );
              })
            ) : (
              <h1>Varited user was not found</h1>
            )}
          </div>
        );
      }}
    </Subscribe>
  );
};

export default component;
