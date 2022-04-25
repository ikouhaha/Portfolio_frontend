import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { getChildrenToRender } from '../common/utils'

class Content11 extends React.PureComponent {
  render() {
    const { ...props } = this.props;

    //page render data source
    const dataSource = {
      OverPack: {
        className: 'home-page-wrapper content11-wrapper',
        playScale: 0.3,
      },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'image',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
            className: 'title-image',
          },
          { name: 'title', children: 'Contact Us', className: 'title-h1' },
          {
            name: 'content',
            children:
              'If you have any questions, please contact us',
            className: 'title-content',
          },
        ],
      },
      button: {
        className: '',
        children: { a: { className: 'button', href: '#', children: "Let's contact" } },
      },
    };
    delete props.dataSource;
    delete props.isMobile;
    return (
      <OverPack  {...dataSource.OverPack}>
        <QueueAnim
          type="bottom"
          leaveReverse
          key="page"
          delay={[0, 100]}
          {...dataSource.titleWrapper}
        >
          {dataSource.titleWrapper.children.map(getChildrenToRender)}
        </QueueAnim>
      
      </OverPack>
    );
  }
}

export default Content11;
