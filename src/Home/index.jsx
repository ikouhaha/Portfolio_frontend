/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import { enquireScreen } from 'enquire-js';

import Nav2 from '../components/Nav2';
import Banner3 from '../components/Banner3';
import Content8 from './Content8';
import Content9 from './Content9';
import Content10 from './Content10';
import Content11 from './Content11';
import Content12 from './Content12';
import Footer2 from '../components/Footer2';

import {
  Nav20DataSource,
  Banner30DataSource,
  Content80DataSource,
  Content90DataSource,
  Content100DataSource,
  Content110DataSource,
  Content120DataSource,
  Footer20DataSource,
} from '../common/data.source';


let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port, 
    };
  }

  componentDidMount() {
    
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    if (location.port) {
      
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    
  }

  render() {
    const children = [
      <Nav2
        id="Nav2_0"
        key="Nav2_0"
        dataSource={Nav20DataSource}
        isMobile={this.state.isMobile}
      />,
      <Banner3
        id="Banner3_0"
        key="Banner3_0"
        dataSource={Banner30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content8
        id="Content8_0"
        key="Content8_0"
        dataSource={Content80DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content9
        id="Content9_0"
        key="Content9_0"
        dataSource={Content90DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content10
        id="Content10_0"
        key="Content10_0"
        dataSource={Content100DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content11
        id="Content11_0"
        key="Content11_0"
        dataSource={Content110DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content12
        id="Content12_0"
        key="Content12_0"
        dataSource={Content120DataSource}
        isMobile={this.state.isMobile}
      />,
      <Footer2
        id="Footer2_0"
        key="Footer2_0"
        dataSource={Footer20DataSource}
        isMobile={this.state.isMobile}
      />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        
        {this.state.show && children}
        
      </div>
    );
  }
}
