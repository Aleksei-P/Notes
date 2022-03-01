//обращение к маршрутам по ссылке

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import Note from '../components/Note'

const GET_NOTE = gql`
  query Note($noteId: ID) {
    note(id: $noteId) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;


const NotePage = props => {

    //доступ к параметрам
    const { id: noteId } = useParams();
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { noteId } });

    if (loading) return <p>Loading..</p>
    if (error) return <p>Error</p>
    return <Note note={data.note} />

};

export default NotePage;