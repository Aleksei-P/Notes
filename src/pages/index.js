import React, { Component, Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Routes,
  Redirect,
  Link,
  Navigate,
  Outlet
} from 'react-router-dom';

import Layout from '../components/Layout';

import { useQuery, gql } from '@apollo/client';
import { IS_LOGGED_IN } from '../components/gql/query';



import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';

const Pages = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Layout>
          <Routes>
            {/* <Switch> */}
            <Route exact path="/" element={<Home />} />

            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/mynotes" element={<MyNotes />} />
              <Route exact path="/new" element={<NewNote />} />
              <Route exact path="/edit/:id" element={<EditNote />} />
            </Route>
            {/* <PrivateRoute path="/mynotes" element={<MyNotes />} /> */}

            {/*<Route path="/mynotes" element={<MyNotes />} /> */}

            <Route exact path="/favorites" element={<Favorites />} />
            <Route exact path="/note/:id" element={<NotePage />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
            {/* </Switch> */}
          </Routes>
        </Layout>
      </Fragment>
    </BrowserRouter>
  );
};
/*
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  {console.log(data.isLoggedIn);}
  return (
    // <BrowserRouter>

    <Routes>
      <Route
        {...rest}
        render={(props) =>
          data.isLoggedIn.data ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    </Routes>
    // </BrowserRouter>
  );
};
*/

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  {
    console.log(data.isLoggedIn.data);
  }
  // const auth = null; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return (
  data.isLoggedIn.data === true ? (
    <Outlet {...rest} />
  ) : (
    <Navigate to="/signin" />
  )
  )
};


export default Pages;
