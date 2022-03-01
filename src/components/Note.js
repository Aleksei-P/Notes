//markup for individual note

import React from 'react';
import ReactMarkdown from 'react-markdown';

//changing format of the time
import { format, parseISO } from 'date-fns';

import styled from 'styled-components';

const StyledNote = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

const MetaData = styled.div`
  @media (min-width: 500px) {
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
  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>By</em> {note.author.username} <br />
          {format(parseISO(note.createdAt), 'MM-dd-yyyy')}
        </MetaInfo>
        <UserActions>
          <em>Favorites: </em>
          {note.favoriteCount}
        </UserActions>
      </MetaData>
      <ReactMarkdown children={note.content} />
    </StyledNote>
  );
};

export default Note;
