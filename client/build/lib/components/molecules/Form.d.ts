import * as React from 'react';
import { ITypeahead } from '../pages/Toppage';
interface Props {
    text: string;
    isEmpty: boolean;
    typeahead?: ITypeahead;
    selected: boolean;
    changeHandler: (e: any) => void;
    submitHandler: () => void;
    selectForm: React.Dispatch<React.SetStateAction<boolean>>;
}
declare const Component: React.FC<Props>;
export default Component;
