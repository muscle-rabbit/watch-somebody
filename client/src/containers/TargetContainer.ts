import { Container } from 'unstated-typescript';

type TargetState = {
  target: string;
};

class TargetContainer extends Container<TargetState> {
  public state = {
    target: ''
  };
  public setTarget(text: string) {
    this.setState({ target: text });
  }
}

export default TargetContainer;
