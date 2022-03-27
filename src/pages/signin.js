import React, { useEffect } from 'react';
import { useApolloClient, useMutation, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

import { useNavigate } from 'react-router-dom';

const SIGNIN_USER = gql`
  mutation signIn($username: String, $password: String!) {
    signIn(username: $username, password: $password)
  }
`;

const SignIn = (props) => {
  useEffect(() => {
    document.title = 'Sing In - Notedly';
  });

  let navigate = useNavigate();

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      console.log('dataSign', data.signIn);
      localStorage.setItem('token', data.signIn);
      client.writeQuery({
        query: gql`
          query {
            isLoggedIn
          }
          `,
          data: {
           isLoggedIn: {
        data: true
      },
    },
        });
        navigate('/');
    },
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signIn" />
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
    </React.Fragment>
  );
};

export default SignIn;
