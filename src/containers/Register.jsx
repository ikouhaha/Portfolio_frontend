

import RegisterForm from '../components/RegisterForm';


import React from "react";

import * as AppReducer from '../redux/app'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


const mapDispatchToProps = dispatch => ({
    //⑤ Bindactioncreators simplify dispatch
    appAction: bindActionCreators(AppReducer, dispatch)
})

const mapStateToProps = state => ({ app: state.App });

@connect(mapStateToProps, mapDispatchToProps)
class Register extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const childrens = [
            <RegisterForm key="register" {...this.props.app} {...this.props.appAction} />
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


export default Register;
