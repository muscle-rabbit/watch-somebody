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
import { select } from '@storybook/addon-knobs';

interface Props extends RouteComponentProps {}
export type GetTimeline = Pick<User, 'id_str' | 'name'>;

export type ITypeahead = {
  '0': string;
  '1': object;
  '2': object;
  '3': object;
};

export enum TypeaheadData {
  query = 0,
  results,
  descriptions,
  link
}

const component: React.FC<Props> = ({ history }) => {
  const [typeahead, setTypeahead]: [
    ITypeahead | undefined,
    React.Dispatch<ITypeahead | undefined>
  ] = useState();

  const [formSelected, selectForm] = useState(false);

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
        .post('/page/search/', { query: query })
        .then(res => console.log(res))
        .catch(res => console.log(res));
      await axios.get<User[]>(`/page/search/?q=${query}`).then(r => {
        callback(r.data);
      });
      history.push(`/page/search/?q=${query}`);
    } catch (e) {
      throw Error(e);
    }
  };

  const getSeachSuggest = async (query: string) => {
    try {
      await axios
        .get(
          `${'https://cors-anywhere.herokuapp.com/'}https://ja.wikipedia.org/w/api.php?action=opensearch&search=${query}`
        )
        .then(res => setTypeahead(res.data))
        .catch(res => console.log(res));
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
              typeahead={typeahead}
              selected={formSelected}
              selectForm={selectForm}
              isEmpty={isEmpty(search.state.query)}
              submitHandler={() => {
                submitTargetHandler(search.state.query, twitter.setUsers);
              }}
              changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
                search.setTarget(e.target.value as string);
                getSeachSuggest(e.target.value);
              }}
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
