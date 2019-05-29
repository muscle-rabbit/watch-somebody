import { Container } from 'unstated-typescript';

export type INews = {
  header: Header;
  contents: string;
};

type Header = {
  title: string;
  updated: string;
  link: string;
};

type State = {
  newslist: INews[];
};

class NewsContainer extends Container<State> {
  public state: { newslist: INews[] } = { newslist: [] };
  public setNews = async (newslist: INews[]) => {
    await this.setState({ newslist: newslist });
  };
}

export default NewsContainer;
