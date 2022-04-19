import React, { useContext } from "react";
import { Result, Button } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

import * as http from '../common/http-common'
import { getAllActionMap, getAllStateMap, loading, done } from '../common/utils'
import { connect } from "react-redux";


function Logout(props) {
  const navigate = useNavigate();

  React.useEffect(()=> {
    (async () => {
      try {
        
     
        
        let res = await http.get(props,"/auth/signout")
        //console.log(res)
        props.userAction.logout()
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


const output = (props) =>{
  const navigation = useNavigate();
  return <Logout {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)



