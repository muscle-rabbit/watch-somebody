import { Container } from 'unstated-typescript';
declare type queryState = {
    query: string;
};
declare class TargetContainer extends Container<queryState> {
    state: {
        query: string;
    };
    setTarget(text: string): void;
}
export default TargetContainer;
