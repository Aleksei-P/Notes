import React from "react";
import { useMutation } from "@apollo/client";

import ButtonAsLink from './ButtonAsLink';

import { DELETE_NOTE } from './gql/mutation'

import { GET_MY_NOTES, GET_NOTES } from "./gql/query";

import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

const DeleteNote = props => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        refetchQueries: [{query: GET_MY_NOTES, GET_MY_NOTES}],
        onCompleted: data => {
            history.push('/mynotes');
            location.reload();

        }
    });
    return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};

export default DeleteNote;