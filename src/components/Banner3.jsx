import React from 'react';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import { Link } from 'react-router-dom';


class Banner extends React.Component {

  componentDidMount(){
    
  }
  render() {

    const { ...currentProps } = this.props
    

    

    const test = () => {
      (async () => {
        try {
          
          //await http.get(this.props, "/dogs/37")
          
        } catch (ex) {
          
        }

      })()

    }
    const dataSource = {
      wrapper: { className: 'banner3' },
      textWrapper: {
        className: 'banner3-text-wrapper',
        children: [
          {
            name: 'nameEn',
            className: 'banner3-name-en',
            children: 'Hong Kong Pet Finder',
          },
          {
            name: 'slogan',
            className: 'banner3-slogan',
            children: 'Find your favourite dogs',
            texty: true,
          },
          {
            name: 'name',
            className: 'banner3-name',
            children: 'save the dogs',
          },
          { name: 'button', className: 'banner3-button', children: "Let's Find" },

        ],
      },
    };
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    const children = dataSource.textWrapper.children.map((item) => {
      const { name, texty, ...$item } = item;
      if (name.match('button')) {
        return (
          <Button type="primary" key={name} {...$item} >
             <Link to='/dogs'>{item.children}</Link>
          </Button>
        );
      }

      return (
        <div key={name} {...$item}>
          {texty ? (
            <Texty type="mask-bottom">{item.children}</Texty>
          ) : (
            item.children
          )}
        </div>
      );
    });
    return (
      <div  {...dataSource.wrapper}>
        <QueueAnim
          key="QueueAnim"
          type={['bottom', 'top']}
          delay={200}
          {...dataSource.textWrapper}
        >
          {children}
        </QueueAnim>
      </div>
    );
  }
}


export default Banner


