

import LoginForm from '../components/LoginForm';

import { Card } from 'antd'
import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as AppReducer from '../redux/app'
import { getAllActionMap, getAllStateMap, uuid } from '../common/utils'
import { useNavigate } from 'react-router-dom';


function Login(props) {

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
                            <LoginForm key="login" {...props} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>

    )
}


//map state and action in redux define to the component 
const output = (props) => {
    const navigation = useNavigate();
    return <Login {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)



  