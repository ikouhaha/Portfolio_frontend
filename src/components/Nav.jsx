import React, { useEffect } from 'react';



import { Layout, Space, Avatar, Dropdown, Menu, Button } from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Title from 'antd/lib/typography/Title';
import { DownOutlined } from '@ant-design/icons';

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
    return (
        <Header>
            <Space size='large'>

                <Title className='header2-logo' style={{ color: 'white' }} level={2}>Pet Finder</Title>
                <Link to="/" className='header-nav-link'>Home</Link>
                <Link to="/dogs" className='header-nav-link'>Dogs</Link>
                <Link to="/favourites" className='header-nav-link'>Favourites</Link>
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


export default Nav





