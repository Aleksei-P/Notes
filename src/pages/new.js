import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../components/NoteForm";

import { GET_NOTES, GET_MY_NOTES } from "../components/gql/query";

import { useNavigate } from 'react-router-dom';

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


const NewNote = props => {
  useEffect(() => {
    document.title = 'New Note';
  });

  let navigate = useNavigate();

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{query: GET_NOTES}, {query: GET_MY_NOTES}],
    onCompleted: data => {
      navigate(`../note/${data.newNote.id}`);
      }
  });

    return (
        <React.Fragment>
        {loading && <p>loading</p>}
        {error && <p>error</p>}
        <NoteForm action={data} />
        </React.Fragment>
    );
}

export default NewNote;