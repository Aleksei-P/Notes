import React from "react";
import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';

import Layout from "../components/Layout";

import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./signin";

const Pages = () => {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* <Switch> */}
            <Route exact path="/" element={<Home />} />
            <Route path="/mynotes" element={<MyNotes />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/note/:id" element={<NotePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Layout>
        {/* </Switch> */}
      </BrowserRouter>
    );
};

export default Pages;