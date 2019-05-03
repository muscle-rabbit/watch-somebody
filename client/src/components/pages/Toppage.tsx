import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { Subscribe } from 'unstated-typescript';

import { Container } from 'react-bootstrap';
import Form from '../molecules/Form';
import TargetContainer from '../../containers/TargetContainer';

interface Props extends RouteComponentProps {}

const component: React.FC<Props> = ({ history }) => {
  const isEmpty = (text: string) => {
    if (text === '') {
      return true;
    }
    return false;
  };

  const submitTargetHandler = (target: string) => {
    history.push('/dashboard');
    axios
      .post('/dashboard', { target: target })
      .then(res => console.log(res))
      .catch(res => console.log(res));
  };

  return (
    <Subscribe to={[TargetContainer]}>
      {target => (
        <OutWrapper>
          <Form
            isEmpty={isEmpty(target.state.target)}
            submitHandler={() => {
              submitTargetHandler(target.state.target);
            }}
            changeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
              target.setTarget(e.target.value as string)
            }
            text={target.state.target}
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
