import * as React from 'react';
import styled from 'styled-components';
import { INews } from '../../containers/NewsContainer';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';

import { color } from '../../design';

const component: React.FC<INews> = ({ header, contents, ...props }) => {
  return (
    <OutWrapper {...props}>
      <Title>
        <a href={header.link}>{header.title}</a>
      </Title>
      Updated: <Moment date={header.updated} format={'MM/DD'} />
      <br />
      <Contents dangerouslySetInnerHTML={{ __html: contents }} />
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
const Contents = styled.div``;
