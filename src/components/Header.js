import React from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// import { useQuery, gql } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
// import { withRouter } from 'react-router';
import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

import ButtonAsLink from "./ButtonAsLink";
import logo from '../img/logo.svg';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloCache,
  gql,
  useQuery,
  NormalizedCacheObject,
  useMutation
} from '@apollo/client';

const IS_LOGGED_IN = gql`
{
  isLoggedIn @client
}
`;


const UserState = styled.div`
margin-left: auto;
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const Header = (props) => {

  const { data, client } = useQuery(IS_LOGGED_IN);

  // client.writeQuery({
  //   query: IS_LOGGED_IN,
  //   data: { isLoggedIn: !!localStorage.getItem('token') },
  // });


  return (
    <header>
        <HeaderBar>
          <img src={logo} alt="Logo" height="40" />
          <LogoText>
            Notedly
          </LogoText>
          {console.log("dataHeader", data.isLoggedIn.data)}
          <UserState>{
            data.isLoggedIn.data ? (
              <ButtonAsLink onClick={() => {
                localStorage.removeItem('token');
              client.resetStore();
              client.writeQuery({
                query: gql`
                  query {
                    isLoggedIn
                  }
                `,
                data: {
                  isLoggedIn: false,
                },
              });

              history.push('/')
              location.reload();
              return {data};
              }}
              >
                Log Out
              </ButtonAsLink>
          ) : (
            <p>
              <Link to = {'/signin'}>Sign In</Link> or {' '}
              <Link to = {'/signup'}>Sign Un</Link>
            </p>
          )}
            </UserState>
        </HeaderBar>
      </header>
    );
};

export default Header;