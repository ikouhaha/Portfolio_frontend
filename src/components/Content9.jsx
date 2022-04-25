import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { getChildrenToRender } from '../common/utils';
import { loremIpsum, name, surname, fullname, username, LoremIpsum } from 'react-lorem-ipsum';

class Content9 extends React.PureComponent {
  getBlockChildren = (block, i) => {
    const { isMobile } = this.props;
    const item = block.children;
    const textWrapper = (
      <QueueAnim
        key="text"
        leaveReverse
        delay={isMobile ? [0, 100] : 0}
        {...item.textWrapper}
      >
        <h2 key="title" {...item.title}>
          <i {...item.icon}>
            <img src={item.icon.children} alt="img" />
          </i>
          {item.title.children}
        </h2>
        <div key="p" {...item.content}>
          {item.content.children}
        </div>
      </QueueAnim>
    );
    return (
      <OverPack key={i.toString()} {...block}>
        {isMobile && textWrapper}
        <QueueAnim
          className="image-wrapper"
          key="image"
          type={isMobile ? 'right' : 'bottom'}
          leaveReverse
          delay={isMobile ? [100, 0] : 0}
          {...item.imgWrapper}
        >
          <div key="image" {...item.img}>
            <img src={item.img.children} alt="img" />
          </div>
          <div key="name" className="name-wrapper">
            <div key="name" {...item.name}>
              {item.name.children}
            </div>
            <div key="post" {...item.post}>
              {item.post.children}
            </div>
          </div>
        </QueueAnim>

        {!isMobile && textWrapper}
      </OverPack>
    );
  };

  render() {
    const { ...props } = this.props;
    const renderChildrens = () =>{
      let children = [];
      let count = 4
      for(var i = 0; i < count; i++){
        children.push(
          {
            name: 'block'+i,
            className: 'block-wrapper',
            playScale: 0.3,
            children: {
              imgWrapper: { className: 'image-wrapper' },
              textWrapper: { className: 'text-wrapper' },
              img: {
                className: 'block-img',
                children:
                  'https://gw.alipayobjects.com/zos/rmsportal/SlFgHDtOTLzccvFrQHLg.png',
              },
              icon: {
                className: 'block-icon',
                children:
                  'https://gw.alipayobjects.com/zos/rmsportal/qJnGrvjXPxdKETlVSrbe.svg',
              },
              name: { className: 'block-name', children: fullname('female') },
              post: { className: 'block-post', children: `${username()}@gmail.com` },
  
              title: {
                className: 'block-title', children: <LoremIpsum
                  avgWordsPerSentence={1}
                  avgSentencesPerParagraph={1}
                  startWithLoremIpsum={false}
                />
              },
              content: { className: 'block-content', children: <LoremIpsum /> },
            }
          }
        )
      }
      

      return children
    }
    //page render data source
    const dataSource = {
      wrapper: { className: 'home-page-wrapper content9-wrapper' },
      page: { className: 'home-page content9' },
      titleWrapper: {
        className: 'title-wrapper',
        children: [
          {
            name: 'image',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/PiqyziYmvbgAudYfhuBr.svg',
            className: 'title-image',
          },
          { name: 'title', children: 'Teams', className: 'title-h1' },
        ],
      },
      block: {
        className: 'timeline',
        children: renderChildrens(),
      },
    };

    delete props.dataSource;
    delete props.isMobile;
    const children = dataSource.block.children.map(this.getBlockChildren);
    return (
      <div {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map(getChildrenToRender)}
          </div>
          <div {...dataSource.block}>{children}</div>
        </div>
      </div>
    );
  }
}

export default Content9;
