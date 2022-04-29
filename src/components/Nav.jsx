import React, { useEffect } from 'react';



import { Layout, Space, Avatar, Dropdown, Menu, Button } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Title from 'antd/lib/typography/Title';
import { DownOutlined } from '@ant-design/icons';
import * as http from '../common/http-common'
import { uuid } from '../common/utils';
const { Header, Content } = Layout;


const menu = (
    <Menu key={uuid()}>
         
        <Menu.Item key={uuid()}>
            <Link to="/profile" key={uuid()} >Profile</Link>
        </Menu.Item >
        <Menu.Item key={uuid()}>
            <Link to="/changepwd" key={uuid()} >Change Password</Link>
        </Menu.Item>
      
        <Menu.Item key={uuid()}>
            <Link to="/signout"  key={uuid()}>Logout</Link>

        </Menu.Item>
    </Menu>
);

function Nav(props) {

    useEffect(() => {

    })
    return (
        <Header>
            <Space size='large'>

                <Title className='header2-logo' style={{ color: 'white' }} level={2}>Pet Finder</Title>
                <Link key={uuid()} to="/" className='header-nav-link'>Home</Link>
                <Link key={uuid()} to="/dogs" className='header-nav-link'>Dogs</Link>
                <Link key={uuid()} to="/favourites" className='header-nav-link'>Favourites</Link>
            </Space>

            <span style={{ height: 64, float: 'right' }}>
                <Space>
                    {(() => {
                        if (!props.user.isLogin) {
                            const childrens = [
                                <Link key={uuid()} to="/signin" className='header-nav-link' >Signin</Link>,
                                <Link key={uuid()} to="/signup" className='header-nav-link' ><Button ghost >SignUp</Button></Link>

                            ]
                            return (

                                childrens
                            )
                        } else {
                            return (
                                <Dropdown overlay={menu} placement="bottomRight" arrow>
                                    <a key={uuid()} onClick={e => e.preventDefault()}>
                                        <Avatar size="32" src={props.user.avatarUrl ? props.user.avatarUrl : "./dp.png"} />
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


export default Nav





