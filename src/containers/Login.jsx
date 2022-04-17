

import LoginForm from '../components/LoginForm';


import React from "react";

import * as AppReducer from '../redux/app'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


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
            <LoginForm key="login" {...this.props.app} />
        ]

        return (
            <div
                className="templates-wrapper"

            >

                {this.props.app.isShow && childrens}

            </div>
        )
    }

}





export default Login;
