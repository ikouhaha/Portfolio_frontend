

import LoginForm from '../components/LoginForm';

import { Card } from 'antd'
import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as AppReducer from '../redux/app'
import { getAllActionMap, getAllStateMap, uuid } from '../common/utils'
@connect(getAllStateMap, getAllActionMap)
class Login extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {



        return (

            <div
                className="templates-wrapper"

            >
                <div key={uuid()} className="site-card-border-less-wrapper">
                    <div className='banner3' style={{ "textAlign": "left" }}>
                        <div
                            className='banner3-text-wrapper'
                            style={{ width: "30%" }}
                        >
                            <Card >
                                <LoginForm key="login" />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}


export default Login;
