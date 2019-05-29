import { Container } from 'unstated-typescript';
export declare type INews = {
    header: Header;
    contents: string;
};
declare type Header = {
    title: string;
    updated: string;
    link: string;
};
declare type State = {
    newslist: INews[];
};
declare class NewsContainer extends Container<State> {
    state: {
        newslist: INews[];
    };
    setNews: (newslist: INews[]) => Promise<void>;
}
export default NewsContainer;
