import { Container } from 'unstated-typescript';

type queryState = {
  query: string;
};

class TargetContainer extends Container<queryState> {
  public state = {
    query: ''
  };
  public setTarget(text: string) {
    this.setState({ query: text });
  }
}

export default TargetContainer;
