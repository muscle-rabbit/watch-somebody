import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Form from '../molecules/Form';

interface Props extends RouteComponentProps {}

const component: React.FC<Props> = ({ history }) => {
  const [target, setTarget] = useState('');
  const isEmpty = (text: string) => {
    if (text === '') {
      return true;
    }
    return false;
  };

  const changeHandler = (e: any) => {
    setTarget(e.target.value);
  };

  const submitTargetHandler = () => {
    history.push('/dashboard');
    axios
      .post('/dashboard', { target: target })
      .then(res => console.log(res))
      .catch(res => console.log(res));
  };
  return (
    <OutWrapper>
      <Form
        isEmpty={isEmpty(target)}
        submitHandler={submitTargetHandler}
        changeHandler={changeHandler}
        text={target}
      />
    </OutWrapper>
  );
};

export default component;

const OutWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
`;
