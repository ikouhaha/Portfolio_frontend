

import RegisterForm from '../components/RegisterForm';


import React from "react";
import { getAllStateMap,getAllActionMap } from '../common/utils';

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';



function Register(props) {


    const childrens = [
        <RegisterForm key="register" {...props}/>
    ]

    return (

        <div
            className="templates-wrapper"

        >
            {childrens}
        </div>

    )


}


//map state and action in redux define to the component 
const output = (props) => {
    const navigation = useNavigate();
    return <Register {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)


