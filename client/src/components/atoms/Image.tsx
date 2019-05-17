import * as React from 'react';
import styled from 'styled-components';

interface Props {
  src: string;
  fit?: boolean;
}

const component: React.FC<Props> = ({ src, fit, ...props }) => (
  <img
    src={src}
    alt=""
    style={{ maxWidth: '100%', maxHeight: '100%' }}
    {...props}
  />
);

export default component;
