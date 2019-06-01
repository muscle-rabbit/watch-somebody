import * as React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

import { ITypeahead, TypeaheadData } from '../pages/Toppage';
// import { Typeahead } from 'react-bootstrap-typeahead';

// const Typeahead = require('react-bootstrap-typeahead');

interface Props {
  text: string;
  isEmpty: boolean;
  typeahead?: ITypeahead;
  selected: boolean;

  changeHandler: (e: any) => void;
  submitHandler: () => void;
  selectForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Component: React.FC<Props> = ({
  isEmpty,
  changeHandler,
  submitHandler,
  text,
  typeahead,
  selectForm,
  selected,
  ...props
}) => {
  function genTypeaheadArray(results: object | undefined) {
    if (!results) return [''];
    let strings = [];
    for (let i = 0; i <= 10; i++) {
      strings[i] = results[i];
    }
    return strings;
  }
  return (
    <StyledForm {...props}>
      <Form.Group controlId="">
        <Form.Label>追っかけサーチ</Form.Label>
        <Form.Control type="text" onChange={changeHandler} value={text} />
        <Form.Text className="text-muted">
          追っかけをしたい人の名前を入力してくだい。
        </Form.Text>
      </Form.Group>
      <Button onClick={submitHandler}>決定</Button>
      {/* <Typeahead
        onChange={(selected: boolean) => {
          selectForm(selected);
        }}
        options={genTypeaheadArray(typeahead)}
        selected={selected}
      /> */}
    </StyledForm>
  );
};
export default Component;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;
