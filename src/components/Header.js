import React from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import ButtonAsLink from "./ButtonAsLink";
import logo from '../img/logo.svg';

import {
  gql,
  useQuery,
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
  background-color: #d4d4d4;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0 5px;
  display: inline;
`;

const Header = (props) => {

  const { data, client } = useQuery(IS_LOGGED_IN);

  let navigate = useNavigate();

  return (
    <header>
        <HeaderBar>
          <img src={logo} alt="Logo" height="40" />
          <LogoText>
            Notes
          </LogoText>
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

              navigate('/')
              return {data};
              }}
              >
                Log Out
              </ButtonAsLink>
          ) : (
            <p>
              <Link to = {'/signin'}>Sign In</Link> or {' '}
              <Link to = {'/signup'}>Sign Up</Link>
            </p>
          )}
            </UserState>
        </HeaderBar>
      </header>
    );
};

export default Header;