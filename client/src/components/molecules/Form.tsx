import * as React from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
// import { createBrowserHistory, } from 'history'

interface Props {
  text: string;
  isEmpty: boolean;

  changeHandler: (e: any) => void;
  submitHandler: () => void;
}

const Component: React.FC<Props> = ({
  isEmpty,
  changeHandler,
  submitHandler,
  text,
  ...props
}) => {
  return (
    <StyledForm>
      <Form.Group controlId="">
        <Form.Label>追っかけサーチ</Form.Label>
        <Form.Control type="text" onChange={changeHandler} value={text} />
        <Form.Text className="text-muted">
          追っかけをしたい人の名前を入力してくだい。
        </Form.Text>
      </Form.Group>
      <Button onClick={submitHandler}>決定</Button>
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
