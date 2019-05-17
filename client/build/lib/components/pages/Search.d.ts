import * as React from 'react';
import { User } from 'twitter-d';
import { RouteComponentProps } from 'react-router-dom';
export declare type GetTimeline = Pick<User, 'id_str' | 'name'>;
interface Props extends RouteComponentProps {
}
declare const component: React.FC<Props>;
export default component;
