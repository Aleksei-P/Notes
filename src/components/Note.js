//markup for individual note

import React from 'react';
import ReactMarkdown from 'react-markdown';

import { useQuery } from '@apollo/client';

import NoteUser from './NoteUser';

import { IS_LOGGED_IN } from './gql/query';

//changing format of the time
import { format, parseISO } from 'date-fns';

import styled from 'styled-components';

const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

const MetaData = styled.div`
  @media (min-width: 300px) {
    display: flex;
    align-items: top;
  }
`;

const MetaInfo = styled.div`
  padding-right: 1em;
`;

const UserActions = styled.div`
  margin-left: auto;
`;

const Note = ({ note }) => {

  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if(loading) return <p>Loading!</p>
  if (error) return <p>Error!</p>;

  return (
    <StyledNote>
      <MetaData key={note.id}>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>Author:</em> {note.author.username} <br />
          {format(parseISO(note.createdAt), 'MM-dd-yyyy')}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>🤍</em> ({note.favoriteCount})
          </UserActions>
        )}
      </MetaData>
      <ReactMarkdown children={note.content} />
      <br />
    </StyledNote>
  );
};

export default Note;
