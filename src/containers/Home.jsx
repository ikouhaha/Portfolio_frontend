

import Banner3 from '../components/Banner3';
import Content8 from '../components/Content8';
import Content9 from '../components/Content9';
import Content10 from '../components/Content10';
import Content11 from '../components/Content11';
import Content12 from '../components/Content12';

import { useNavigate, Link, unstable_HistoryRouter } from 'react-router-dom';

import React, { useState } from "react";

import { connect } from 'react-redux';
import { getAllStateMap, getAllActionMap } from '../common/utils'
import * as http from '../common/http-common'


function Home(props) {
    const [dogs,setDogs] = useState([])
    React.useEffect(() => {
        (async () => {
            try {
                console.log(props)
                let res = await http.get(props, "/dogs?page=1&limit=8")
                setDogs(res)      
            } catch (ex) {

                console.dir(ex)
            }

        })()
    }, []);




    const childrens = [
        <Banner3
            id="Banner3_0"
            key="Banner3_0"
            navigate={props.navigate}
        />,
        <Content8
            id="Content8_0"
            key="Content8_0"
            dogs={dogs}
            navigate={props.navigate}
        />,
        <Content9
            id="Content9_0"
            key="Content9_0"
            navigate={props.navigate}


        />,
        <Content10
            id="Content10_0"
            key="Content10_0"
            navigate={props.navigate}
        />,
        <Content11
            id="Content11_0"
            key="Content11_0"
            navigate={props.navigate}

        />,
        <Content12
            id="Content12_0"
            key="Content12_0"
            navigate={props.navigate}

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



//map state and action in redux define to the component 
const output = (props) => {
    const navigation = useNavigate();
    return <Home {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)



