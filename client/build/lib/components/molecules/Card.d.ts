import * as React from 'react';
import { User } from 'twitter-d';
declare type CardProps = Pick<User, 'name' | 'screen_name' | 'default_profile_image' | 'profile_banner_url' | 'description' | 'profile_image_url_https'> & Props;
declare type Props = {
    url: string;
};
declare const component: React.FC<CardProps>;
export default component;
