import React from "react";
import Note from './Note';
import LinkText from './Link';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { IS_LOGGED_IN } from './gql/query';

const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

const NoteFeed = ({notes}) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
    return (
      <div>
        {notes.map((note) => (
          <NoteWrapper key={note.id}>
            <Note note={note} />
            {data.isLoggedIn.data === true && (
              <LinkText to={`/edit/${note.id}`}>edit</LinkText>
            )}
            <br />
            <LinkText to={`../note/${note.id}`}>open note</LinkText>
          </NoteWrapper>
        ))}
      </div>
    );
};

export default NoteFeed;