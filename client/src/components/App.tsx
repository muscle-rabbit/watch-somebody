import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import { Container } from 'react-bootstrap';
import Form from './molecules/Form';

interface Props {}

const App: React.FC<Props> = (props: Props) => {
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
    console.log('posting value');
    console.log(target);
    axios
      .post('/', { target: target })
      .then(res => console.log(res))
      .catch(res => console.log(res));
  };

  return (
    <Router>
      <OutWrapper>
        <Route
          exact
          path="/"
          render={() => (
            <Form
              isEmpty={isEmpty(target)}
              changeHandler={changeHandler}
              target={target}
              submitHandler={submitTargetHandler}
            />
          )}
        />
        <Route path="/dashboard" component={Dashboard} />
      </OutWrapper>
    </Router>
  );
};

const Dashboard: React.FC<Props> = () => {
  return <p>this is dashboard</p>;
};

export default App;

const OutWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
`;
