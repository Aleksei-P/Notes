import React, { useEffect } from "react";
import { useApolloClient, useMutation, gql } from "@apollo/client";

import UserForm from "../components/UserForm";

import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

const SIGNIN_USER = gql`
mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
}
`

const SignIn = (props) => {
    useEffect(() => {
        document.title = 'Sing In - Notedly';
    });

    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            console.log('dataSign', data)
            localStorage.setItem('token', data.signIn);
          client.writeQuery({
            query: gql`
              query {
                isLoggedIn
              }
            `,
            data: {
              isLoggedIn: true,
            },
          });
            history.push('/');
            location.reload();
            return data
        }
    })

    return (
        <React.Fragment>
            <UserForm action={signIn} formType='signIn'/>
            {loading && <p>Loading</p>}
            {error && <p>Error</p>}
        </React.Fragment>
    );
};

export default SignIn;