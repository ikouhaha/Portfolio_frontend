import React, { useEffect } from 'react';



import { Layout, Space, Avatar, Dropdown, Menu, Button } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Title from 'antd/lib/typography/Title';
import { DownOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllStateMap, getAllActionMap,loading,done } from '../common/utils'
import * as http from "../common/http-common"

const { Header, Content } = Layout;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
            <Link to="/signout"  >logout</Link>

        </Menu.Item>
    </Menu>
);

function Nav(props) {
    React.useEffect(()=> {
        (async () => {
          try {
            
         
            loading(props)
            let res = await http.get(props,"/auth/profile")
            console.log(res)
            if(res&&res.user){
                props.userAction.login(res.user)
            }else{
                props.userAction.logout()
            }
            
            
            done(props)
          } catch (ex) {
            done(props)
            console.dir(ex)
          }
      
        })()
      },[]);
    
    return (
        <Header>
            <Space>

                <Title className='header2-logo' style={{ color: 'white' }} level={2}>Pet Finder</Title>
                <Link to="/" className='header-nav-link'>Home</Link>
            </Space>

            <span style={{ height: 64, float: 'right' }}>
                <Space>
                    {(() => {
                        if (!props.user.isLogin) {
                            const childrens = [
                                <Link to="/signin" className='header-nav-link' >Signin</Link>,
                                <Link to="/signup" className='header-nav-link' ><Button ghost >SignUp</Button></Link>

                            ]
                            return (

                                childrens
                            )
                        } else {
                            return (
                                <Dropdown overlay={menu} placement="bottomRight" arrow>
                                    <a onClick={e => e.preventDefault()}>
                                        <Avatar size="32" src={props.user.avatarUrl?props.user.avatarUrl:"./dp.png"} />
                                        <DownOutlined className='header-nav-link' style={{ paddingLeft: 6 }} />
                                    </a>

                                </Dropdown>
                            )
                        }
                    })()}
                </Space>

            </span>

        </Header>
    );

}


const output = (props) => {
    const navigation = useNavigate();
    return <Nav {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)





