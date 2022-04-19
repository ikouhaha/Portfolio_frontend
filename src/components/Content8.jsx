import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { getChildrenToRender,getAllStateMap,getAllActionMap,loading,done } from '../common/utils';
import { connect } from 'react-redux';
import * as http from "../common/http-common"
import { useNavigate, Link, unstable_HistoryRouter } from 'react-router-dom';

class Content8 extends React.Component {
  
  componentDidMount(){
    (async () => {
      try {
        loading(this.props)
        let res = await http.get(this.props, "/dogs?page=1&limit=10")
        console.log(res)
        
        done(this.props)
      } catch (ex) {
        done(this.props)
        console.dir(ex)
      }

    })()
  }

  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  getBlockChildren = (item, i) => {
    const children = item.children;
    const delay = this.props.isMobile ? i * 50 : this.getDelay(i, 24 / item.md);
    const liAnim = {
      y: 30,
      opacity: 0,
      type: 'from',
      ease: 'easeOutQuad',
      delay,
    };
    return (
      <TweenOne component={Col} animation={liAnim} key={i.toString()} {...item}>
        <div {...children}>
          <div className="image-wrapper" {...children.img}>
            <img src={children.img.children} alt="img" />
          </div>
          <h2 {...children.title}>{children.title.children}</h2>
          <div {...children.content}>{children.content.children}</div>
        </div>
      </TweenOne>
    );
  };

  render() {
    const { ...props } = this.props;
    const dataSource  = {
      wrapper: { className: 'home-page-wrapper content8-wrapper' },
      page: { className: 'home-page content8' },
      OverPack: { playScale: 0.3 },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'image',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
            className: 'title-image',
          },
          { name: 'title', children: 'dogs', className: 'title-h1' },
        ],
      },
      block: {
        className: 'content-wrapper',
        children: [
          {
            name: 'block0',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAGUlEQVR4nGJxj+FhQAVMDBiAmkKAAAAA//9RPwC+l7MxBgAAAABJRU5ErkJggg==',
              },
              title: { className: 'content8-title', children: 'Jack' },
              content: {
                className: 'content8-content',
                children: '公司+职位 信息暂缺',
              },
            },
          },
          {
            name: 'block1',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children:
                  'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png',
              },
              title: { className: 'content8-title', children: 'Jack' },
              content: {
                className: 'content8-content',
                children: '公司+职位 信息暂缺',
              },
            },
          },
          {
            name: 'block2',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children:
                  'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png',
              },
              title: { className: 'content8-title', children: 'Jack' },
              content: {
                className: 'content8-content',
                children: '公司+职位 信息暂缺',
              },
            },
          },
          {
            name: 'block3',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children:
                  'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png',
              },
              title: { className: 'content8-title', children: 'Jack' },
              content: {
                className: 'content8-content',
                children: '公司+职位 信息暂缺',
              },
            },
          },
          {
            name: 'block4',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children:
                  'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png',
              },
              title: { className: 'content8-title', children: 'Jack' },
              content: {
                className: 'content8-content',
                children: '公司+职位 信息暂缺',
              },
            },
          },
          {
            name: 'block5',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children:
                  'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png',
              },
              title: { className: 'content8-title', children: 'Jack' },
              content: {
                className: 'content8-content',
                children: '公司+职位 信息暂缺',
              },
            },
          },
          {
            name: 'block6',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children:
                  'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png',
              },
              title: { className: 'content8-title', children: 'Jack' },
              content: {
                className: 'content8-content',
                children: '公司+职位 信息暂缺',
              },
            },
          },
          {
            name: 'block7',
            md: 6,
            xs: 24,
            className: 'content8-block-wrapper',
            children: {
              className: 'content8-block',
              img: {
                className: 'content8-img',
                children:
                  'https://gw.alipayobjects.com/zos/rmsportal/JahzbVrdHdJlkJjkNsBJ.png',
              },
              title: { className: 'content8-title', children: 'Jack' },
              content: {
                className: 'content8-content',
                children: '公司+职位 信息暂缺',
              },
            },
          },
        ],
      },
    };
    delete props.dataSource;
    delete props.isMobile;
    const children = dataSource.block.children.map(this.getBlockChildren);
    return (
      <div  {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim type="bottom" key="img">
              <Row {...dataSource.block} key="img">
                {children}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}


const output = (props) =>{
  const navigation = useNavigate();
  return <Content8 {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)



