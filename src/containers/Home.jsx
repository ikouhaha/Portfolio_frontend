

import Banner3 from '../components/Banner3';
import Content8 from '../components/Content8';
import Content9 from '../components/Content9';
import Content10 from '../components/Content10';
import Content11 from '../components/Content11';
import Content12 from '../components/Content12';


import React from "react";

import * as AppReducer from '../redux/app'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'


const mapDispatchToProps = dispatch => ({
    //⑤ Bindactioncreators simplify dispatch
    appAction: bindActionCreators(AppReducer, dispatch)
  })
  
const mapStateToProps = state => ({app: state.App});
@connect(mapStateToProps,mapDispatchToProps)
class Home extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        
        const childrens = [
            <Banner3
            id="Banner3_0"
            key="Banner3_0"
    
            {...this.props.app}
        />,
        <Content8
            id="Content8_0"
            key="Content8_0"
            
            {...this.props.app}
        />,
        <Content9
            id="Content9_0"
            key="Content9_0"
            
            {...this.props.app}
        />,
        <Content10
            id="Content10_0"
            key="Content10_0"
            
            {...this.props.app}
        />,
        <Content11
            id="Content11_0"
            key="Content11_0"
            
            {...this.props.app}
        />,
        <Content12
            id="Content12_0"
            key="Content12_0"
            
            {...this.props.app}
        />
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


// function Home {
//     const { ...currentProps } = props;
    // const childrens = [
    //     <Banner3
    //     id="Banner3_0"
    //     key="Banner3_0"

    //     isMobile={currentProps.isMobile}
    // />,
    // <Content8
    //     id="Content8_0"
    //     key="Content8_0"
    //     dataSource={Content80DataSource}
    //     isMobile={currentProps.isMobile}
    // />,
    // <Content9
    //     id="Content9_0"
    //     key="Content9_0"
    //     dataSource={Content90DataSource}
    //     isMobile={currentProps.isMobile}
    // />,
    // <Content10
    //     id="Content10_0"
    //     key="Content10_0"
    //     dataSource={Content100DataSource}
    //     isMobile={currentProps.isMobile}
    // />,
    // <Content11
    //     id="Content11_0"
    //     key="Content11_0"
    //     dataSource={Content110DataSource}
    //     isMobile={currentProps.isMobile}
    // />,
    // <Content12
    //     id="Content12_0"
    //     key="Content12_0"
    //     dataSource={Content120DataSource}
    //     isMobile={currentProps.isMobile}
    // />
    // ]


//     console.log(this.is)
//     return (
//         <div
//             className="templates-wrapper"

//         >

//            {currentProps.isShow&&childrens}

//         </div>
//     )

// }


export default Home;
