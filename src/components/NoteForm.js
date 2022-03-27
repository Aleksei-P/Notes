import React, { useState } from "react";
import styled from "styled-components";

import Button from "./Button";

const Wrapper = styled.div`
height: 100%;
`;

const Form = styled.form`
height: 100%;
`;

const TextArea = styled.textarea`
width: 100%;
height: 50%;
`;

const NoteForm = (props) => {
    const [values, setValue] = useState({content: props.note || ''});

    const onChange = (evt) => {
      setValue({
        ...values,
        [evt.target.name]: evt.target.value
      })
    }

      return (
        <Wrapper>
        <Form
          onSubmit={(evt) => {
            evt.preventDefault();

            props.action({
              variables: {
                ...values,
              },
            });
          }}
        >
          <TextArea
            required
            type="text"
            name="content"
            placeholder="Note content"
            value={values.content}
            onChange={onChange}
            />
          <Button type="submit" >Save</Button>
        </Form>
      </Wrapper>
    );
};

export default NoteForm;