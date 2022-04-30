import React from "react";

import { useNavigate } from 'react-router-dom';

import * as http from '../common/http-common'
import { getAllActionMap, getAllStateMap } from '../common/utils'
import { connect } from "react-redux";


function Logout(props) {
  const navigate = useNavigate();

  React.useEffect(()=> {
    (async () => {
      try {
        
     
        
        await http.get(props,"/auth/signout")
        
        localStorage.clear()
        props.userAction.reset()
        navigate("/")
        
      } catch (ex) {
        
        console.dir(ex)
      }
  
    })()
  },[]);

  return (
    <div></div>
  );
}



//map state and action in redux define to the component 
const output = (props) => {
  const navigation = useNavigate();
  return <Logout {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)




