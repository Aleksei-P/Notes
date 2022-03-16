import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../components/NoteForm";

import { GET_NOTES, GET_MY_NOTES } from "../components/gql/query";
import Button from "../components/Button";

const NEW_NOTE = gql`
  mutation NewNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoriteBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

const NewNote = props => {
    useEffect(() => {
        document.title = 'New Note';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
      refetchQueries: [{query: GET_NOTES}, {query: GET_MY_NOTES}],
      onCompleted: data => {
        history.push(`note/${data.newNote.id}`);
        location.reload();

        // return data
      }
    });
    console.log('new', data);

    return (
        <React.Fragment>
        {loading && <p>loading</p>}
        {error && <p>error</p>}
        <NoteForm action={data} />
        </React.Fragment>
    );
}

export default NewNote;