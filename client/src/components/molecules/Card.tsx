import * as React from 'react';
import styled from 'styled-components';
import { User, UserEntities } from 'twitter-d';

import { Card, Button } from 'react-bootstrap';
import Link from '../atoms/Link';
import Img from '../atoms/Image';

type CardProps = Pick<
  User,
  | 'name'
  | 'screen_name'
  | 'default_profile_image'
  | 'profile_banner_url'
  | 'description'
  | 'profile_image_url_https'
> &
  Props;

type Props = {
  url: string;
};

const component: React.FC<CardProps> = ({
  name,
  screen_name,
  default_profile_image,
  profile_image_url_https,
  profile_banner_url,
  url,
  description,
  ...props
}) => {
  return (
    <Card {...props} style={{ width: '290px', height: '290px' }}>
      <BannerLink url={typeof url === 'string' ? url : ''}>
        <BannerImg
          src={profile_banner_url !== null ? profile_banner_url : ''}
        />
      </BannerLink>
      <Card.Body>
        <IconButtonAlign>
          <IconLink url={typeof url === 'string' ? url : ''}>
            <Icon src={profile_image_url_https} />
          </IconLink>
          <Button>選ぶ</Button>
        </IconButtonAlign>
        <NameLink url={typeof url === 'string' ? url : ''}>
          <UserName>{name}</UserName>
        </NameLink>
        <ScreenName>
          @
          <SNameLink url={typeof url === 'string' ? url : ''}>
            {screen_name}
          </SNameLink>
        </ScreenName>
        <Description>{description}</Description>
      </Card.Body>
    </Card>
  );
};

export default component;

const BannerLink = styled(Link)`
  height: 90px;
  overflow: hidden;
`;

const BannerImg = styled(Card.Img)`
  width: 100%;
`;

const IconButtonAlign = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 37px;
  position: relative;
  &::after {
    content: '';
    height: 76px;
    width: 76px;
    background-color: white;
    bottom: -1px;
    position: absolute;
    left: 15%;
    margin-left: -38px;
    border-radius: 50%;
  }
`;

const Icon = styled(Img)`
  border-radius: 50%;
  height: 70px;
  width: 70px;
`;

const IconLink = styled(Link)`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  left: 15%;
  margin-left: -35px;
  bottom: 2px;
`;

const UserName = styled(Card.Title)`
  margin-bottom: 0px;
  display: inline-box;
  font-size: 16px;
  &:hover {
    color: #212529;
    text-decoration: underline;
  }
`;

const ScreenName = styled(Card.Text)`
  color: rgb(102, 117, 127);
  margin-bottom: 6px;
`;

const SNameLink = styled(Link)`
  color: rgb(102, 117, 127);
  font-size: 14px
  &:hover {
    color: rgb(102, 117, 127);
    text-decoration: underline;
  }
`;

const NameLink = styled(Link)`
  color: #212529;
  &:hover {
    color: #212529;
    text-decoration: underline;
  }
`;

const Description = styled(Card.Text)`
  overflow: hidden;
  font-size: 14px;
  margin-bottom: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
