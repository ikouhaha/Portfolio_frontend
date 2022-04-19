import React, { Component } from 'react';

import { enquireScreen } from 'enquire-js';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Home from "./containers/Home"
import Login from "./containers/Login"
import Logout from "./containers/Logout"
import Register from "./containers/Register"
import NotFound from "./containers/notfound"
import { Layout, Space, Avatar, Dropdown, Menu } from 'antd';
import './less/antMotionStyle.less';

import Footer2 from './components/Footer2';
import Nav from './components/Nav';
import LoadingOverlay from 'react-loading-overlay';
import BarLoader from "react-spinners/BarLoader";

import { connect } from 'react-redux';
import { getAllStateMap, getAllActionMap, loading, done } from './common/utils'
import * as http from './common/http-common'

const { Header, Content } = Layout;

//import './App.css';




let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};



class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { ...props } = this.props
    enquireScreen((b) => {
      this.props.appAction.setMobile(!!b)
    });

    if (location.port) {

      setTimeout(() => {
        this.props.appAction.setShow(true)
      }, 500);
    }

    (async () => {
      try {



        let res = await http.get(props, "/auth/profile")
        console.log(res)
        if (res && res.user) {
          props.userAction.login(res.user)
        } else {
          props.userAction.logout()
        }



      } catch (ex) {

        console.dir(ex)
      }

    })()
  }

  render() {

    return (
      <>
        <LoadingOverlay
          styles={{
            content: {margin:'unset',width:'100%'}
          }}
          active={this.props.app.loading}
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
          active={this.props.app.loading}
          spinner
          text="Loading your content"


        >
          <Router>
            <Nav />

            <Content>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signin" element={<Login />} />
                <Route exact path="/signup" element={<Register />} />
                <Route exact path="/signout" element={<Logout />} />
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

    );
  }
}



export default connect(getAllStateMap, getAllActionMap)(App)