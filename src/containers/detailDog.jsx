import React, { useEffect, useState } from "react";
import { Icon,Layout, Row, Col, Button, Card, Avatar, Descriptions, Badge, Breadcrumb } from 'antd';
import { useNavigate, Link, useParams } from 'react-router-dom';

import LoginForm from '../components/LoginForm'
import * as http from '../common/http-common'

import { MessageOutlined } from '@ant-design/icons';
import FaviouriteButton from "../components/FaviouriteButton";
import { getAllActionMap,getAllStateMap } from "../common/utils";
import { connect } from 'react-redux';

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;
function DetailDog(props) {
  const { id } = useParams();
  const { dog} = props
  React.useEffect(() => {
    (async () => {
      try {
        let res = await http.get(props, "/dogs/" + id)
        props.dogAction.load(res)
        console.log(dog)

      } catch (ex) {

        console.dir(ex)
      }

    })()
  }, []);


  if(!dog){
    return (<></>)
  }

  return (
    <div
      className="templates-wrapper"
    >
      <div className="banner3" style={{ "textAlign": "left" }}>
        <div className="home-page-wrapper content9-wrapper">
          <div className="home-page content9">
            <Layout className="layout">
              <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item><Link to="/"> Home</Link></Breadcrumb.Item>
                  <Breadcrumb.Item><Link to="/dogs">List</Link></Breadcrumb.Item>
                  <Breadcrumb.Item>Dog</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">

                  <Row>
                    <Col span={6}><img width={'100%'} src={dog.imageBase64}></img> 
                    <FaviouriteButton action={props.dogAction} data={props.dog}/>

                    </Col>
                    <Col span={1}></Col>
                    <Col span={17}>
                      <Descriptions title="Dog Info" layout="vertical" bordered>
                        <Descriptions.Item label="Name">{dog.name}</Descriptions.Item>
                        <Descriptions.Item label="Breed">{dog.breed.name}</Descriptions.Item>
                        <Descriptions.Item label="Life span">{dog.breed.life_span}</Descriptions.Item>
                        <Descriptions.Item label="Weight (imperial)">{dog.breed.weight.imperial}</Descriptions.Item>
                        <Descriptions.Item label="Height (imperial)" span={2}>
                        {dog.breed.height.imperial}
                        </Descriptions.Item>
                        <Descriptions.Item label="Temperament" span={3}>
                          {dog.breed.temperament}
                        </Descriptions.Item>
                        <Descriptions.Item label="About">
                          {dog.about}
                        </Descriptions.Item>
                      </Descriptions>

                    </Col>
                  </Row>

                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
          </div>
        </div>
      </div>
    </div>


  )

}


const output = (props) =>{
  const navigation = useNavigate();
  return <DetailDog {...props} navigate={navigation} />
}

export default connect(getAllStateMap, getAllActionMap)(output)

