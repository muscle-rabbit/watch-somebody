import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { User } from 'twitter-d';
interface Props extends RouteComponentProps {
}
export declare type GetTimeline = Pick<User, 'id_str' | 'name'>;
export declare type ITypeahead = {
    query: string;
    results: string[];
    descriptions: string[];
    link: string[];
};
declare const component: React.FC<Props>;
export default component;
