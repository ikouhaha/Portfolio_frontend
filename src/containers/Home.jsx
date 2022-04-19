

import Banner3 from '../components/Banner3';
import Content8 from '../components/Content8';
import Content9 from '../components/Content9';
import Content10 from '../components/Content10';
import Content11 from '../components/Content11';
import Content12 from '../components/Content12';


import React from "react";

import { connect } from 'react-redux';
import {getAllStateMap,getAllActionMap} from '../common/utils'

@connect(getAllStateMap,getAllActionMap)
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const childrens = [
            <Banner3
            id="Banner3_0"
            key="Banner3_0"

        />,
        <Content8
            id="Content8_0"
            key="Content8_0"

        />,
        <Content9
            id="Content9_0"
            key="Content9_0"
            

        />,
        <Content10
            id="Content10_0"
            key="Content10_0"
            
            
        />,
        <Content11
            id="Content11_0"
            key="Content11_0"
            
            
        />,
        <Content12
            id="Content12_0"
            key="Content12_0"
            
            
        />
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




export default Home;
