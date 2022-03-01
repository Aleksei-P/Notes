import React from "react";
import Note from './Note';
import { Link } from 'react-router-dom';

const NoteFeed = ({notes}) => {
    return (
        <div>
            {notes.map(note => (
                <div key={note.id}>
                    <Note note={note} />
                    <Link to={`note/${note.id}`}>Permalink</Link>
                </div>
            ))}
        </div>
    );
};

export default NoteFeed;