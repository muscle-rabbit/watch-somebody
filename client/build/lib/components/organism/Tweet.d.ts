import * as React from 'react';
import { User } from 'twitter-d';
import { Status as Tweet } from 'twitter-d';
import 'moment-timezone';
declare type TweetProps = UserProps & TweetInfo & Props;
declare type UserProps = Pick<User, 'name' | 'screen_name' | 'profile_image_url_https'>;
declare type TweetInfo = Pick<Tweet, 'created_at' | 'favorite_count'>;
declare type Props = {
    url: string;
    text: string;
};
declare const component: React.FC<TweetProps>;
export default component;
declare const TweetInfo: import("styled-components").StyledComponent<"div", any, {}, never>;
