

import LoginForm from '../components/LoginForm';


import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as AppReducer from '../redux/app'

const mapDispatchToProps = dispatch => ({
    //⑤ Bindactioncreators simplify dispatch
    appAction: bindActionCreators(AppReducer, dispatch)
  })
  
  const mapStateToProps = state => ({ app: state.App });
@connect(mapStateToProps,mapDispatchToProps)
  class Login extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const childrens = [
            <LoginForm key="login" />
        ]

        return (

            <div
                className="templates-wrapper"

            >
                {childrens}
            </div>

        )
    }

}


export default Login;
