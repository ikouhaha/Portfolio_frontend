import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Home from "./containers/Home"
import Login from "./containers/Login"
import { Layout, Space, Avatar, Dropdown, Menu } from 'antd';
import './less/antMotionStyle.less';
import Footer2 from './components/Footer2';
import Nav from './components/Nav';

import {connect } from 'react-redux';
import {bindActionCreators } from 'redux'
import * as AppReducer from './redux/app'

const { Header, Content } = Layout;

//import './App.css';


const mapStateToProps = state => ({store: state});
const mapDispatchToProps = dispatch => ({
  //⑤ Bindactioncreators simplify dispatch
  actions: bindActionCreators(AppReducer, dispatch)
})



let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};


@connect(mapStateToProps,mapDispatchToProps)
class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  
    enquireScreen((b) => {
      this.props.actions.setMobile(!!b)
    });

    if (location.port) {

      setTimeout(() => {
        this.props.actions.setShow(true)
      }, 500);
    }

  }

  render() {
    
    return (
      <Router>
        <Nav />

        <Content>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Content>

        <Footer2
          id="Footer2_0"
          key="Footer2_0"

        />,

      </Router>
    );
  }
}



export default App