import * as React from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
};

const component: React.FC<Props> = ({ text, ...props }) => <p>{text}</p>;

export default component;
