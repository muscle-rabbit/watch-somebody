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
declare class ProgramsContainer extends Container<State> {
    state: {
        programs: Program[];
    };
    setPrograms: (programs: Program[]) => Promise<void>;
}
export default ProgramsContainer;
