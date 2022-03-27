import React, { useEffect, useState, Component } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }
  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const SignUp = (props) => {
  const [values, setValues] = useState();
  const client = useApolloClient();
  let navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp);
      client.writeQuery({
        query: gql`
          query {
            isLoggedIn
          }
        `,
        data: {
          isLoggedIn: {
            data: true,
          },
        },
      });
      navigate('/');
    },
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
    </React.Fragment>
  );
};

export default SignUp;