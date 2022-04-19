
import React from 'react';
import { Button } from 'antd';
import { bindActionCreators } from 'redux'
import * as AppReducer from '../redux/app'
import * as UserReducer from '../redux/user'


export const Type = {
  app: "App",
  appAction: "appAction",
  user: "User",
  userAction: "userAction"
}
export const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;
export const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
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
    if(props.app&&!props.app.loading){
      props.appAction.setLoading(true)
    }
   
}

export const done = (props) => {
  if (props && props.appAction)
    props.appAction.setLoading(false)
}

export const getAllStateMap = state => ({ app: state.App, user: state.User });


export const getAllActionMap = dispatch => ({
  //⑤ Bindactioncreators simplify dispatch
  appAction: bindActionCreators(AppReducer, dispatch),
  userAction: bindActionCreators(UserReducer, dispatch)
})


