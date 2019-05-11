import * as React from 'react';
import styled from 'styled-components';

interface Props {
  src: string;
}

const component: React.FC<Props> = ({ src, ...props }) => (
  <img src={src} alt="" {...props} />
);

const styledImg = styled.img`
  border-radius: 50%;
`;

export default component;
