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
          { name: 'title', children: '丰富的特色展台', className: 'title-h1' },
          {
            name: 'content',
            children:
              '特色展台包括 Ant Design 、AntV、AntG、Egg 等明星产品，更有产品专家',
            className: 'title-content',
          },
          {
            name: 'content2',
            children: '现场问诊，为你答疑解难',
            className: 'title-content',
          },
        ],
      },
      button: {
        className: '',
        children: { a: { className: 'button', href: '#', children: '立即报名' } },
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
        <TweenOne
          key="button"
          style={{ textAlign: 'center' }}
          {...dataSource.button}
          animation={{ y: 30, opacity: 0, type: 'from', delay: 300 }}
        >
          <Button {...dataSource.button.children.a}>
            {dataSource.button.children.a.children}
          </Button>
        </TweenOne>
      </OverPack>
    );
  }
}

export default Content11;
