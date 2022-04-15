import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import { BrowserRouter as Router,
  Routes, Route, Link 
 } from 'react-router-dom'
 import Home from "./pages/Home"
 import { Layout, Space } from 'antd'; 
 import './less/antMotionStyle.less';
 import Footer2 from './components/Footer2';

 
 const { Header, Content } = Layout;
 
//import './App.css';




let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};

class App extends Component {
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
    
    return (
      <Router>      
      <Header>
        <nav>
          <Space>
          <Link to="/">Home</Link>  
          </Space>
        </nav>
      </Header>       
      <Content>
        <Routes>
          <Route exact path="/" element={ <Home />} />     
        </Routes>
      </Content>
      
      <Footer2
        id="Footer2_0"
        key="Footer2_0"
        isMobile={this.state.isMobile}
      />,
      
    </Router>   
    );
  }
}

export default App;
