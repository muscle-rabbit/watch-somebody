import * as React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { Program } from '../../containers/ProgramsContainer';
import Moment from 'react-moment';

import { color } from '../../design';

const component: React.FC<Program> = ({
  title,
  schedule,
  description,
  genre,
  station,
  ...props
}) => {
  return (
    <OutWrapper {...props}>
      <Title>{title}</Title>
      <Moment date={schedule.begin} format={'MM/DD'} />
      <br />
      <Moment date={schedule.begin} format={'hh:mm'} />~
      <Moment date={schedule.until} format={'hh:mm'} />
      <Description>{description}</Description>
      <p>{`${genre.category} - ${genre.subcategory}`}</p>
      <p>{station}</p>
    </OutWrapper>
  );
};

export default component;

const OutWrapper = styled(Card)`
  width: 480px;
  border: 0.5px solid ${color.gray};
  border-radius: 4px;
  margin-bottom: 5px;
  padding: 12px;
`;
const Title = styled(Card.Title)``;
const Time = styled.div``;
const Description = styled(Card.Text)``;
