import * as React from 'react';
import { ITypeahead } from '../pages/Toppage';
interface Props {
    text: string;
    isEmpty: boolean;
    typeahead: ITypeahead | undefined;
    changeHandler: (e: any) => void;
    submitHandler: () => void;
}
declare const Component: React.FC<Props>;
export default Component;
