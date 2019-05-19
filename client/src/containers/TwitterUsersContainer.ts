import { Container } from 'unstated-typescript';
import { Status as ITweet, User } from 'twitter-d';
import { AxiosResponse } from 'axios';

type IUser = Pick<
  User,
  | 'created_at'
  | 'description'
  | 'favourites_count'
  | 'id_str'
  | 'name'
  | 'screen_name'
  | 'profile_banner_url'
  | 'profile_background_image_url_https'
>;

type State = {
  users: User[];
};

class TwitterUsersContainers extends Container<State> {
  public state: { users: User[] } = { users: [] };
  public setUsers = async (users: User[]) => {
    await this.setState({ users: users });
  };
}

export default TwitterUsersContainers;
