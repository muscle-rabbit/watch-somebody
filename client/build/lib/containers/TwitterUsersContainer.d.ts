import { Container } from 'unstated-typescript';
import { User } from 'twitter-d';
declare type State = {
    users: User[];
};
declare class TwitterUsersContainers extends Container<State> {
    state: {
        users: User[];
    };
    setUsers: (users: User[]) => Promise<void>;
}
export default TwitterUsersContainers;
