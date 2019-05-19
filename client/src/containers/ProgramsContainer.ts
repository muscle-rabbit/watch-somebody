import { Container } from 'unstated-typescript';

type Program = {
  title: string;
  schedule: {
    begin: string;
    until: string;
  };
  description: string;
  genre: {
    category: string;
    subcategory: string;
  };
  statinon: string;
};

type State = {
  programs: Program[];
};

class TwitterUsersContainers extends Container<State> {
  public state: { programs: Program[] } = { programs: [] };
  public setUsers = async (programs: Program[]) => {
    await this.setState({ programs: programs });
  };
}

export default TwitterUsersContainers;
