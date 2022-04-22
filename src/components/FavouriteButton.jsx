

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row,Spin ,Button} from 'antd';
//import articles from './data/articles.json'

import { HeartOutlined,HeartFilled } from '@ant-design/icons';


function FavouriteButton(props) {  
  React.useEffect(()=> {
    // props.action.load({isFavourite:true})
  },[]);

 
  if(props.isFavourite){
      return (<Button type={props.type||'link'} onClick={()=>props.handleFavourite(false)} icon={<HeartFilled />}></Button>)
  }else{
    return (<Button type={props.type||'link'} onClick={()=>props.handleFavourite(true)} icon={<HeartOutlined />}></Button>)
  }
 
}
export default FavouriteButton;