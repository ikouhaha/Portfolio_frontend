

import LoginForm from '../components/LoginForm';


import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as AppReducer from '../redux/app'
import {getAllActionMap,getAllStateMap} from '../common/utils'
@connect(getAllStateMap,getAllActionMap)
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
