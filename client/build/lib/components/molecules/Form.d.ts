import * as React from 'react';
interface Props {
    text: string;
    isEmpty: boolean;
    changeHandler: (e: any) => void;
    submitHandler: () => void;
}
declare const Component: React.FC<Props>;
export default Component;
