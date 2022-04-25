import React from 'react';
import QueueAnim from 'rc-queue-anim';


class Content10 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: props.isMobile,
    };
  }

  onClick = () => {
    window.open(this.props.dataSource.Content.children.url.children);
  };

  markerEnter = () => {
    this.setState({
      showInfo: true,
    });
  };

  markerLeave = () => {
    this.setState({
      showInfo: false,
    });
  };

  render() {
    const { ...props } = this.props;

    //page render data source
    const dataSource  = {
      wrapper: { className: 'home-page-wrapper content10-wrapper' },
      Content: {
        className: 'icon-wrapper',
        children: {
          icon: {
            className: 'icon',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/zIUVomgdcKEKcnnQdOzw.svg',
            name: '主要图标',
          },
          iconShadow: {
            className: 'icon-shadow',
            children:
              'https://gw.alipayobjects.com/zos/rmsportal/WIePwurYppfVvDNASZRN.svg',
            name: '图标影阴',
          },
          url: { children: '', name: '跳转地址' },
          title: { children: '大会地址', name: '弹框标题' },
          content: {
            children: '蚂蚁 Z 空间  浙江省杭州市西湖区西溪路556号',
            name: '弹框内容',
          },
        },
      },
    };
    delete props.dataSource;
    delete props.isMobile;
    return (
      <div  {...dataSource.wrapper}>
        <div
          {...dataSource.Content}
          onMouseEnter={this.markerEnter}
          onMouseLeave={this.markerLeave}
          onClick={this.onClick}
          onTouchEnd={this.onClick}
        >
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2535.4598546862285!2d114.16532240586659!3d22.32528295779635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400b611f6a195%3A0xa0d1947dc280c278!2z6aaZ5riv5YuV54mp6aCY6aSK5Lit5b-D!5e0!3m2!1sen!2shk!4v1650821190210!5m2!1sen!2shk" height="450"  allowFullScreen={true} style={{width:'100%',border:'0'}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    );
  }
}

export default Content10;
