import React from 'react';
import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';

import Button from '../components/Button';

const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      hasNextPage
      cursor
      notes {
        id
        content
        createdAt
        favoriteCount
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) return <p>loading..</p>;
  if (error) return <p>error</p>;

  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes,
                    ],
                    __typename: 'noteFeed',
                  },
                };
              },
            })
          }
        >
          Click me
        </Button>
      )}
    </React.Fragment>
  );
};

// const Home = () => {
//     return(
//         <div>
//            <p>Home page</p>
//            <Button>Click me</Button>
//         </div>
//     );
// };

export default Home;
