import * as React from 'react';
import syled from 'styled-components';

interface Props {
  url: string;
  children: React.ReactChild | React.ReactChild[];
}

const component: React.FC<Props> = ({ url, children, ...props }) => (
  <a href={url} {...props}>
    {children}
  </a>
);

export default component;
