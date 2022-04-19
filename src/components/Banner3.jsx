import React from 'react';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import { connect } from 'react-redux';
import { getAllActionMap, getAllStateMap, loading, done } from '../common/utils';
import * as http from '../common/http-common'
import { useNavigate, Link, unstable_HistoryRouter } from 'react-router-dom';


class Banner extends React.Component {

  componentDidMount(){
    
  }
  render() {

    const { ...currentProps } = this.props
    

    

    const test = () => {
      (async () => {
        try {
          
          await http.get(this.props, "/dogs/37")
          
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
            children: 'Seeking Experience & Engineering Conference',
          },
          {
            name: 'slogan',
            className: 'banner3-slogan',
            children: '首届蚂蚁金服体验科技大会',
            texty: true,
          },
          {
            name: 'name',
            className: 'banner3-name',
            children: '探索极致用户体验与最佳工程实践探索',
          },
          { name: 'button', className: 'banner3-button', children: '立即报名' },
          {
            name: 'time',
            className: 'banner3-time',
            children: '2018.01.06 / 中国·杭州',
          },
        ],
      },
    };
    delete currentProps.dataSource;
    delete currentProps.isMobile;
    const children = dataSource.textWrapper.children.map((item) => {
      const { name, texty, ...$item } = item;
      if (name.match('button')) {
        return (
          <Button type="primary" key={name} {...$item} onClick={test}>
            {item.children}
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


const output = (props) =>{
  const navigation = useNavigate();
  return <Banner {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)


