import React from 'react';
import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';

import Button from '../components/Button';

import { GET_NOTES } from '../components/gql/query';

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) return <p>loading..</p>;
  if (error) return <p>{error.message}</p>;
console.log("notes", data)
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
          load more
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
