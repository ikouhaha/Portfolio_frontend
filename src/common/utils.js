
import React from 'react';
import { Button } from 'antd';
import { bindActionCreators } from 'redux'
import * as AppReducer from '../redux/app'
import * as UserReducer from '../redux/user'
import * as DogReducer from '../redux/dog'



export const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;
export const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  
  tag = item.href ? 'a' : tag;
  //console.log(tag)
  let children = typeof item.children === 'string' && item.children.match(isImg)
    ? React.createElement('img', { src: item.children, alt: 'img' })
    : item.children;
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children
    });
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};


export const uuid = () => {
  return Math.random().toString(36).substr(2, 9);;
}

export const loading = (props) => {
  
  if (props && props.appAction)
      props.appAction.loading()
    
   
}

export const done = (props) => {
  
  if (props && props.appAction)
    props.appAction.done(false)
}

export const setLocalStorageItem = (key,val) => {
  if(val){
    localStorage.setItem(key,JSON.stringify(val))
  }
}

export const getLocalStorageItem = (key) => {
  if(localStorage.getItem(key)){
    return JSON.parse(localStorage.getItem(key))
  }

  return null
}

export const getAllStateMap = state => ({ app: state.App, user: state.User,dog:state.Dog });


export const getAllActionMap = dispatch => ({
  //⑤ Bindactioncreators simplify dispatch
  appAction: bindActionCreators(AppReducer, dispatch),
  userAction: bindActionCreators(UserReducer, dispatch),
  dogAction:bindActionCreators(DogReducer,dispatch)
})


