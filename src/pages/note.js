//обращение к маршрутам по ссылке

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_NOTE } from "../components/gql/query";
import Note from '../components/Note'

const NotePage = props => {
    //доступ к параметрам
    const { id: noteId } = useParams();
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { noteId } });

    if (loading) return <p>Loading..</p>
    if (error) return <p>Error</p>
    return <Note note={data.note} />

};

export default NotePage;