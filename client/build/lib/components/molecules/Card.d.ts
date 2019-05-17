import * as React from 'react';
import { User } from 'twitter-d';
import { GetTimeline } from '../pages/Search';
declare type CardProps = Pick<User, 'id_str' | 'name' | 'screen_name' | 'default_profile_image' | 'profile_banner_url' | 'description' | 'profile_image_url_https'> & Props;
declare type Props = {
    url: string;
    onSelect: React.Dispatch<GetTimeline | undefined>;
    onSubmit: (target: string) => void;
};
declare const component: React.FC<CardProps>;
export default component;
