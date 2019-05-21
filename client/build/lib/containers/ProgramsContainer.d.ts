import { Container } from 'unstated-typescript';
export declare type Program = {
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
    station: string;
};
declare type State = {
    programs: Program[];
};
declare class TwitterUsersContainers extends Container<State> {
    state: {
        programs: Program[];
    };
    setUsers: (programs: Program[]) => Promise<void>;
}
export default TwitterUsersContainers;
