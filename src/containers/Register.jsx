

import RegisterForm from '../components/RegisterForm';


import React from "react";



class Register extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const childrens = [
            <RegisterForm key="register" />
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


export default Register;
