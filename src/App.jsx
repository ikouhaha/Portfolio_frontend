import React, { Component, useEffect, useState } from 'react';

import { enquireScreen } from 'enquire-js';
import {
  BrowserRouter as Router,
  Routes, Route, Link, BrowserRouter
} from 'react-router-dom'
import Home from "./containers/Home"
import Login from "./containers/Login"
import Logout from "./containers/Logout"
import Register from "./containers/Register"
import NotFound from "./containers/notfound"
import DetailDog from "./containers/detailDog"
import Favourites from "./containers/favourites"
import Chat from "./containers/chat"
import Dogs from "./containers/dogs"
import { Layout, Space, Avatar, Dropdown, Menu, Breadcrumb } from 'antd';
import './less/antMotionStyle.less';
import * as http from './common/http-common'

import Footer2 from './components/Footer2';
import Nav from './components/Nav';
import LoadingOverlay from 'react-loading-overlay';
import BarLoader from "react-spinners/BarLoader";

import { connect } from 'react-redux';
import { getAllStateMap, getAllActionMap, loading, done } from './common/utils'

import io from 'socket.io-client';

const { Header, Content } = Layout;





function App(props) {
  /*
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BASE_URL);
    setSocket(newSocket);
    //return () => newSocket.close();
  }, [setSocket]);
  */

  useEffect(() => {
    (async () => {
      try {


          //let res = null
          let res = await http.get(props, "/users/profile")
          //store the profile to redux
          // props.userAction.load(res)



      } catch (ex) {

          console.dir(ex)
      }

  })()
  }, [])


  const DogBread = () => {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/"> Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/dogs">List</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Dog</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  const favouriteDogBread = () => {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/"> Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/favourites">List</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Dog</Breadcrumb.Item>
      </Breadcrumb>
    )
  }


  const DogsBread = () => {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/"> Home</Link></Breadcrumb.Item>

        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
    )
  }




  return (
    <>
     <Chat  />
      <LoadingOverlay
        styles={{
          content: { margin: 'unset', width: '100%' }
        }}
        active={props.app.loading}
        spinner={<BarLoader height={5}

          css={{
            backgroundColor: 'salmon',
            display: 'inherit',
            position: 'fixed',
            margin: '0 auto',
            width: '100%'
          }}
          color="#4285F4"
          loading />}


      />
      <LoadingOverlay
        active={props.app.loading}
        spinner
        text="Loading your content"


      >
        <Router>
          <Nav  userAction={props.userAction} user={props.user} />

          <Content>
            <Routes>

              <Route exact path="/" element={<Home />} />
              <Route exact path="/signin" element={<Login />} />
              <Route exact path="/signup" element={<Register />} />
              <Route exact path="/signout" element={<Logout />} />
              <Route exact path="/dogs" element={<Dogs breadcrumb={DogsBread()} />} />
              <Route exact path="/favourites" element={<Favourites breadcrumb={DogsBread()} />} />
              <Route exact path="/dogs/dog/:id" element={<DetailDog breadcrumb={DogBread()} />} />
              <Route exact path="/favourites/dog/:id" element={<DetailDog breadcrumb={favouriteDogBread()} />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Content>

          <Footer2
            id="Footer2_0"
            key="Footer2_0"

          />,

        </Router>
      </LoadingOverlay>
    </>

  )

}


//map state and action in redux define to the component 
export default connect(getAllStateMap, getAllActionMap)(App)