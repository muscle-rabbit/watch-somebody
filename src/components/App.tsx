import * as React from 'react';
import styled from 'styled-components';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <OutWrapper>
        Hello
      </OutWrapper>
    );
  }
}

export default App;

const OutWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: red;
`;
