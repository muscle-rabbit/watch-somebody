import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { Subscribe } from 'unstated-typescript';

import { Container } from 'react-bootstrap';
import Form from '../molecules/Form';
import TargetContainer from '../../containers/SearchContainer';

interface Props extends RouteComponentProps {}

const component: React.FC<Props> = ({ history }) => {
  const isEmpty = (text: string) => {
    if (text === '') {
      return true;
    }
    return false;
  };

  const submitTargetHandler = async (query: string) => {
    await axios
      .post('/search', { query: query })
      .then(res => console.log(res))
      .catch(res => console.log(res));
    history.push(`/search?q=${query}`);
  };

  return (
    <Subscribe to={[TargetContainer]}>
      {search => (
        <OutWrapper>
          <Form
            isEmpty={isEmpty(search.state.query)}
            submitHandler={() => {
              submitTargetHandler(search.state.query);
            }}
            changeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
              search.setTarget(e.target.value as string)
            }
            text={search.state.query}
          />
        </OutWrapper>
      )}
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
