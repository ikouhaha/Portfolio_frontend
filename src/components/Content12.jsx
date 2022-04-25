import React from 'react';
import { Row, Col } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { getChildrenToRender } from '../common/utils'

class Content12 extends React.PureComponent {
  getChildrenToRender = (data) =>
    data.map((item) => {
      return (
        <Col key={item.name} {...item}>
          <div {...item.children.wrapper}>
            <span {...item.children.img}>
              <img width={200} style={{objectFit:'contain'}} src={item.children.img.children} alt="img" />
            </span>
          </div>
        </Col>
      );
    });

  render() {
    const { ...props } = this.props;

    //page render data source
    const dataSource  = {
      wrapper: { className: 'home-page-wrapper content12-wrapper' },
      page: { className: 'home-page content12' },
      OverPack: { playScale: 0.3, className: '' },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'image',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
            className: 'title-image',
          },
          { name: 'title', children: 'Thanks', className: 'title-h1' },
        ],
      },
      block: {
        className: 'img-wrapper',
        children: [
          {
            name: 'block0',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children:
                  'https://main.spca.org.hk/aniformday2018/jpg/spca.gif',
              },
            },
          },
          {
            name: 'block1',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children:
                  'https://main.spca.org.hk/aniformday2018/jpg/spca.gif',
              },
            },
          },
          {
            name: 'block2',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children:
                  'https://main.spca.org.hk/aniformday2018/jpg/spca.gif',
              },
            },
          },
          {
            name: 'block3',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children:
                  'https://main.spca.org.hk/aniformday2018/jpg/spca.gif',
              },
            },
          },
          {
            name: 'block4',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children:
                  'https://main.spca.org.hk/aniformday2018/jpg/spca.gif',
              },
            },
          },
          {
            name: 'block5',
            className: 'block',
            md: 8,
            xs: 24,
            children: {
              wrapper: { className: 'block-content' },
              img: {
                children:
                  'https://main.spca.org.hk/aniformday2018/jpg/spca.gif',
              },
            },
          },
        ],
      },
    };
    delete props.dataSource;
    delete props.isMobile;
    const childrenToRender = this.getChildrenToRender(
      dataSource.block.children
    );
    return (
      <div  {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div key="title" {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack
            className={`content-template ${props.className}`}
            {...dataSource.OverPack}
          >
            <TweenOneGroup
              component={Row}
              key="ul"
              enter={{
                y: '+=30',
                opacity: 0,
                type: 'from',
                ease: 'easeOutQuad',
              }}
              leave={{ y: '+=30', opacity: 0, ease: 'easeOutQuad' }}
              {...dataSource.block}
            >
              {childrenToRender}
            </TweenOneGroup>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content12;
