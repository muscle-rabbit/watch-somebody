import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { User } from 'twitter-d';
interface Props extends RouteComponentProps {
}
export declare type GetTimeline = Pick<User, 'id_str' | 'name'>;
export declare type ITypeahead = {
    '0': string;
    '1': object;
    '2': object;
    '3': object;
};
export declare enum TypeaheadData {
    query = 0,
    results = 1,
    descriptions = 2,
    link = 3
}
declare const component: React.FC<Props>;
export default component;
