
import { useState } from 'react';
import { Home } from './components/home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout';
import Viewings from './components/viewing';
import { MainContextProvider } from './components/context/StateContext.jsx'
import Details from './components/Details.jsx';
import MyProperties from './components/property/MyProperties.jsx';


const App = () => {

  return (
    <>
      <Router>
        <MainContextProvider>
          <Routes>
            <Route path={"/"}
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route path={"/viewing"}
              element={
                <Layout>
                  <Viewings />
                </Layout>
              }
            />
            <Route path="/details/:id"
              element={
                <Layout>
                  <Details />
                </Layout>}
            />

            <Route path="/my-properties"
              element={
                <Layout>
                  <MyProperties />
                </Layout>}
            />
          </Routes>
        </MainContextProvider>
      </Router>
    </>

  )
}

export default App
