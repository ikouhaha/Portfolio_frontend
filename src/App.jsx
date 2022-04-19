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

import { connect } from 'react-redux';
import {getAllStateMap,getAllActionMap} from './common/utils'

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

    enquireScreen((b) => {
      this.props.appAction.setMobile(!!b)
    });

    if (location.port) {

      setTimeout(() => {
        this.props.appAction.setShow(true)
      }, 500);
    }

  }

  render() {

    return (
      <LoadingOverlay
        active={this.props.app.loading}
        spinner
        text='Loading content...'
      >
        <Router>
          <Nav />

          <Content>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signin" element={<Login />} />
              <Route exact path="/signup" element={<Register />} />
              <Route exact path="/signout" element={<Logout />} />
              <Route path="*" element={ <NotFound /> }/>  
            </Routes>
          </Content>

          <Footer2
            id="Footer2_0"
            key="Footer2_0"

          />,

        </Router>
      </LoadingOverlay>

    );
  }
}



export default connect(getAllStateMap, getAllActionMap)(App)