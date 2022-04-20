import React from 'react';
import TweenOne from 'rc-tween-one';

import { Button, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom'


class Header extends React.Component {
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
    //page render data source
    const dataSource = {
      isScrollLink: true,
      wrapper: { className: 'header2 home-page-wrapper jrhtw9ph4a-editor_css' },
      page: { className: 'home-page' },
      logo: {
        className: 'header2-logo',
        children:
          'https://gw.alipayobjects.com/os/s/prod/seeconf/9b458a789d9a000312899b42a7542b9c.svg',
      },
      LinkMenu: {
        className: 'header2-menu',
        children: [
          {
            name: 'linkNav',
            to: '/',
            children: 'Home',
            className: 'menu-item',
          },

          {
            name: 'linkNav',
            to: '/signin',
            children: 'signin',
            className: 'menu-item',
          },
        ],
      },
      mobileMenu: { className: 'header2-mobile-menu' },
      Menu: {
        children: [
          {
            name: 'Banner3_0',
            to: 'Banner3_0',
            children: '首页',
            className: 'active menu-item',
          },
          {
            name: 'Content8_0',
            to: 'Content8_0',
            children: '特邀嘉宾',
            className: 'menu-item',
          },
          {
            name: 'Content9_0',
            to: 'Content9_0',
            children: '会议日程',
            className: 'menu-item',
          },
          {
            name: 'Content10_0',
            to: 'Content10_0',
            children: '大会地址',
            className: 'menu-item',
          },
          {
            name: 'Content11_0',
            to: 'Content11_0',
            children: '展台展示',
            className: 'menu-item',
          },
          {
            name: 'Content12_0',
            to: 'Content12_0',
            children: '特别鸣谢',
            className: 'menu-item',
          },
        ],
      },
    };
    const {  isMobile, ...props } = this.props;

    const { phoneOpen } = this.state;
    const { LinkMenu } = dataSource;
    const navData = LinkMenu.children;
    const navChildren = Object.keys(navData).map((key, i) => {
      const item = navData[key];
      let tag = Link;
      const tagProps = {};
      if (item.to && item.to.match(/\//g)) {
        tagProps.href = item.to;
        tag = 'a';
        delete item.to;
      }
      

      return React.createElement(
        tag,
        { ...item, ...tagProps, key: i.toString() },
        navData[key].children
      );
      
    });
    let navLength = navData.length

    
    const moment = phoneOpen === undefined ? 300 : null;
    return (

      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            {...dataSource.logo}
          >
            <img width="100%" src={dataSource.logo.children} alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...LinkMenu}
            animation={
              isMobile
                ? {
                    height: 0,
                    duration: 300,
                    onComplete: (e) => {
                      if (this.state.phoneOpen) {
                        e.target.style.height = 'auto';
                      }
                    },
                    ease: 'easeInOutQuad',
                  }
                : null
            }
            moment={moment}
            reverse={!!phoneOpen}
          >
            {navChildren}
          </TweenOne>
          
        </div>
      </TweenOne>
      
    );
  }
}

export default Header;
