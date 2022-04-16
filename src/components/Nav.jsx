import React from 'react';



import { Layout, Space, Avatar, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom'
import Title from 'antd/lib/typography/Title';
import { DownOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;
const isLogin = false;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
        </Menu.Item>
    </Menu>
);

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneOpen: false,
        };
    }

    phoneClick = () => {
        const phoneOpen = !this.state.phoneOpen;
        this.setState({
            phoneOpen,
        });
    };

    render() {
        return (
            <Header>



                <Space>

                    <Title className='header2-logo' style={{ color: 'white' }} level={2}>Pet Finder</Title>
                    <Link to="/" className='header-nav-link'>Home</Link>
                </Space>




                <span style={{ height: 64, float: 'right' }}>
                    <Space>
                        {(() => {
                            if (!isLogin) {
                                return (
                                    <Link to="/login" className='header-nav-link' >Login</Link>
                                )
                            } else {
                                return (
                                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                                        <span>
                                            <Avatar size="32" src='./dp.png' />
                                            <DownOutlined className='header-nav-link' style={{ paddingLeft: 6 }} />
                                        </span>


                                        {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                Hover me <DownOutlined />
                              </a> */}

                                    </Dropdown>
                                )
                            }
                        })()}




                    </Space>

                </span>

            </Header>
        );
    }
}

export default Nav;
