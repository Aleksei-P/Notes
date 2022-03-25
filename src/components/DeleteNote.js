import React from "react";
import { useMutation } from "@apollo/client";

import ButtonAsLink from './ButtonAsLink';

import { DELETE_NOTE } from './gql/mutation'

import { GET_MY_NOTES, GET_NOTES } from "./gql/query";

import { useNavigate } from 'react-router-dom';

const DeleteNote = props => {
    let navigate = useNavigate();

    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        refetchQueries: [{query: GET_MY_NOTES}, { query: GET_NOTES }],
        onCompleted: data => {
            navigate('/mynotes');
        }
    });
    return <ButtonAsLink onClick={deleteNote}>🗑️</ButtonAsLink>;
};

export default DeleteNote;