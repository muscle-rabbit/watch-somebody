import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { Subscribe } from 'unstated-typescript';
import { Status as ITweet, User } from 'twitter-d';

import { Container } from 'react-bootstrap';
import Form from '../molecules/Form';
import SearchContainer from '../../containers/SearchContainer';
import TwitterUsersContainer from '../../containers/TwitterUsersContainer';

interface Props extends RouteComponentProps {}
export type GetTimeline = Pick<User, 'id_str' | 'name'>;

const component: React.FC<Props> = ({ history }) => {
  const [varidatedUsers, setVaridatedUser]: [
    User[] | undefined,
    React.Dispatch<User[] | undefined>
  ] = useState();

  const isEmpty = (text: string) => {
    if (text === '') {
      return true;
    }
    return false;
  };

  const submitTargetHandler = async (
    query: string,
    callback: (users: User[]) => void
  ) => {
    try {
      await axios
        .post('/search', { query: query })
        .then(res => console.log(res))
        .catch(res => console.log(res));
      await axios.get<User[]>('/search').then(r => {
        callback(r.data);
      });
      history.push(`/search?q=${query}`);
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <Subscribe to={[SearchContainer, TwitterUsersContainer]}>
      {(search, twitter) => {
        return (
          <OutWrapper>
            <Form
              isEmpty={isEmpty(search.state.query)}
              submitHandler={() => {
                submitTargetHandler(search.state.query, twitter.setUsers);
              }}
              changeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                search.setTarget(e.target.value as string)
              }
              text={search.state.query}
            />
          </OutWrapper>
        );
      }}
    </Subscribe>
  );
};

export default component;

const OutWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
`;
