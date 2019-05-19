import { Container } from 'unstated-typescript';
import { Status as ITweet } from 'twitter-d';
declare type State = {
    timeline: ITweet[];
};
declare class TwitterUsersContainers extends Container<State> {
    state: {
        timeline: ITweet[];
    };
    setTimeline: (timeline: ITweet[]) => Promise<void>;
}
export default TwitterUsersContainers;
