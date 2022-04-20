

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row,Spin ,Button} from 'antd';
//import articles from './data/articles.json'

import { HeartOutlined,HeartFilled } from '@ant-design/icons';


function FaviouriteButton(props) {  
  React.useEffect(()=> {
    // props.action.load({isFaviourite:true})
  },[]);

  const onclick = () =>{
      
  }

  if(props.data.isFaviourite){
      return (<Button type="link"><HeartFilled color="red"/></Button>)
  }else{
    return (<Button type="link" icon={<HeartOutlined/>}></Button>)
  }
 
}
export default FaviouriteButton;