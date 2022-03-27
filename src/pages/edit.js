import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import { useParams } from 'react-router';

import NoteForm from '../components/NoteForm';

import { GET_NOTE, GET_ME } from '../components/gql/query';
import { EDIT_NOTE } from '../components/gql/mutation';

import { useNavigate } from 'react-router-dom';

const EditNote = props => {
  //get info user
  const {loading: userLoading, data: userData}  = useQuery(GET_ME);
  const { id: noteId } = useParams();
  // const id = props.match.params.id;
  //noteId проверить соответствие название перемнной в запросе
  const { loading, error, data } = useQuery(GET_NOTE,  {variables: { noteId }  });

  let navigate = useNavigate();
  console.log(noteId);

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      noteId,
    },
    onCompleted: () => {
      navigate(`../note/${noteId}`);
    },
  });

  if (loading) return 'Loading';
  if (error) return <p>Error! Note not found</p>;
  if (userData.me.id !== data.note.author.id) {
    return <p>You do not have access</p>;
  }
  return <NoteForm note={data.note.content} action={editNote} />;
};

export default EditNote;