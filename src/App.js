import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

// import { createBrowserHistory } from 'history';
// let history = createBrowserHistory();

import GlobalStyle from './components/GlobalStyle';

// Apollo Client

import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloCache,
  gql,
} from '@apollo/client';

//API URI cache
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

//check token and send header

const authLink = setContext((_, { headers }) => {
  return {
    header: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    },

  };
});

const data = {
    isLoggedIn: !!window.localStorage.getItem('token')
};

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
});

cache.writeQuery({
  query: gql`
    query {
      isLoggedIn
    }
    `,
    data: {
      isLoggedIn: {
        data: data.isLoggedIn
      },
    },
  });


client.onResetStore(() => cache.writeQuery(
  {
    query: gql`
    query {
      isLoggedIn
    }
  `,
  data: {
    isLoggedIn: false
  },
})
);

console.log('dataAPP', data)

import Pages from './pages';


const App = () => {
    return (
    <ApolloProvider client={client}>
        <GlobalStyle />
        <Pages />
    </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
