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
    const titleRender = () =>{
      if(children.title.href){
        return (<h2 {...children.title}><Link to={children.title.href}>{children.title.children}</Link></h2>)
      }
      return (<h2 {...children.title}>{children.title.children}</h2>)
    }
    return (
      <TweenOne component={Col} animation={liAnim} key={i.toString()} {...item}>
        <div {...children}>
          <div className="image-wrapper" {...children.img}>
            <img src={children.img.children} alt="img" />
          </div>
          {titleRender()}
          <div {...children.content}>{children.content.children}</div>
        </div>
      </TweenOne>
    );
  };

  render() {
    const { ...props } = this.props;
    const renderDogInformation = (dogs) => {
      if(!dogs){
        return []
      }
      // console.log(dogs)
      let renderDogs = []
      for(let dog of dogs){
        let renderDog =  {
          name: 'block0',
          md: 6,
          xs: 24,
          className: 'content8-block-wrapper',
          children: {
            className: 'content8-block',
            img: {
              className: 'content8-img',
              children:dog.imageBase64,
            },
            title: { className: 'content8-title', children: dog.name ,href:'/dog/'+dog.id},
            content: {
              className: 'content8-content',
              children: dog.about,
            },
          },
        }

        renderDogs.push(renderDog)
      }
      return renderDogs
    }
    let renderDogs = renderDogInformation(props.dogs)||[]
    
    //page render data source
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
          { name: 'title', children: 'Latest Dogs', className: 'title-h1' },
        ],
      },
      block: {
        className: 'content-wrapper',
        children: renderDogs,
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



