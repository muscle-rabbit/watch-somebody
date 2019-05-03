import { Container } from 'unstated-typescript';
declare type TargetState = {
    target: string;
};
declare class TargetContainer extends Container<TargetState> {
    state: {
        target: string;
    };
    setTarget(text: string): void;
}
export default TargetContainer;
