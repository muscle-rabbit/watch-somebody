import * as React from 'react';
import styled from 'styled-components';

import { User } from 'twitter-d';
import { Status as Tweet } from 'twitter-d';

import Icon from '../atoms/Image';
import Text from '../atoms/Paragraph';
import Link from '../atoms/Link';
import IconLink from '../molecules/IconLink';
import { color } from '../../design';

import Moment from 'react-moment';
import 'moment-timezone';

const HeartGray = require('../../assets/heart-outline-gray.png');
const HeartRed = require('../../assets/heart-outline-red.png');
const verified = require('../../assets/twitter_verified.png');
const bird = require('../../assets/twitter.png');

type TweetProps = UserProps & TweetInfo & Props;
type UserProps = Pick<User, 'name' | 'screen_name' | 'profile_image_url_https'>;
type TweetInfo = Pick<Tweet, 'created_at' | 'favorite_count'>;

type Props = {
  url: string;
  text: string;
};

const component: React.FC<TweetProps> = ({
  name,
  screen_name,
  url,
  text,
  favorite_count,
  profile_image_url_https,
  created_at,
  ...props
}) => {
  return (
    <OutWrapper {...props}>
      <TweetHeader>
        <UserIcon src={profile_image_url_https} url={url} />
        <NameContainer>
          <UserLink url={url}>
            <UserName>{name}</UserName>
            <VerifiedIcon src={verified} />
          </UserLink>
          <ScreenNameLink url={`https://twitter.com/${screen_name}`}>
            <ScreenName>@{screen_name}</ScreenName>
          </ScreenNameLink>
        </NameContainer>
        <BirdIcon src={bird} url={'https://twitter.com/'} />
      </TweetHeader>
      <TweetBody>
        <TweetText text={text} />
        <TweetInfo>
          <Like>
            <LikeIcon src={HeartGray} />
            <NLike>{favorite_count}</NLike>
          </Like>
          <TimeLink url={url}>
            <StyledMoment tz={'Asia/Tokyo'} format={'hh:mm A - MMM DD, YYYY'}>
              {created_at}
            </StyledMoment>
          </TimeLink>
        </TweetInfo>
      </TweetBody>
    </OutWrapper>
  );
};

export default component;

const OutWrapper = styled.blockquote`
  padding: 12px;
  width: 498px;
  border-top: 0.5px solid ${color.gray};
`;

const TweetHeader = styled.div`
  display: flex;
`;

const TweetBody = styled.div`
  margin-top: 13px;
`;

const UserName = styled.span`
  font-weight: bold;
  padding-right: 4px;
  color: ${color.black};
  &:hover {
    color: ${color.skyBlue};
    text-decoration: underline;
  }
`;

const ScreenName = styled.div`
  color: ${color.gray};
  font-size: 14px;
`;

const ScreenNameLink = styled(Link)``;

const TweetText = styled(Text)``;

const TweetInfo = styled.div`
  display: flex;
  margin-top: 3.2px;
  font-size: 14px;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
`;

const LikeIcon = styled(Icon)`
  margin: 0px 3px;
  width: 17.5px;
  height: 17.5px;
`;

const NLike = styled.span``;

const VerifiedIcon = styled(Icon)`
  width: 20px;
`;

const BirdIcon = styled(IconLink)`
  width: 20px;
  margin-right: 9px;
  margin-left: auto;
`;

const UserIcon = styled(IconLink)`
  width: 36px;
  margin-right: 9px;
`;

const UserLink = styled(Link)`
  color: ${color.black};
  &:hover {
    color: ${color.skyBlue};
    text-decoration: none;
  }
`;

const NameContainer = styled.div``;

const StyledMoment = styled(Moment)`
  color: ${color.gray};
  &:hover {
    color: ${color.skyBlue};
    cursor: pointer;
  }
`;

const TimeLink = styled(Link)`
display;inline-box;
margin-left:12px;
`;
