import { Container } from 'unstated-typescript';
import { Status as ITweet, User } from 'twitter-d';

type State = {
  timeline: ITweet[];
};

class TimelineContainers extends Container<State> {
  public state: { timeline: ITweet[] } = { timeline: [] };
  public setTimeline = async (timeline: ITweet[]) => {
    await this.setState({ timeline: timeline });
  };
}

export default TimelineContainers;
