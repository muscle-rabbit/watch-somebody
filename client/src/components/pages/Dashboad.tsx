import * as React from 'react';
import { Subscribe } from 'unstated-typescript';
import TargetContainer from '../../containers/TargetContainer';

interface Props {}

const component: React.FC<Props> = () => {
  return (
    <Subscribe to={[TargetContainer]}>
      {target => (
        <h1>This is the dashboard and target is {target.state.target}</h1>
      )}
    </Subscribe>
  );
};

export default component;
