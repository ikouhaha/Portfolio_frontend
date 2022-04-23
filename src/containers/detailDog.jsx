import React, { useEffect, useState } from "react";
import { Icon, Layout, Row, Col, Button, Card, Avatar, Descriptions, Badge, Breadcrumb } from 'antd';
import { useNavigate, Link, useParams } from 'react-router-dom';

import LoginForm from '../components/LoginForm'
import * as http from '../common/http-common'
import { EditOutlined } from '@ant-design/icons';
import { MessageOutlined } from '@ant-design/icons';
import FavouriteButton from "../components/FavouriteButton";
import { getAllActionMap, getAllStateMap } from "../common/utils";
import { connect } from 'react-redux';
import DogModalForm from "../components/DogModalForm";

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;
function DetailDog(props) {
  const { id } = useParams();
  const [showEditModal, setShowEditModal] = useState(false)
  const [isFavourite, setFavourite] = useState(false)
  const [dog, setDog] = useState({ breed: { weight: {}, height: {} } })
  const [breeds, setBreeds] = useState([])
  const baseLink = process.env.REACT_APP_BASE_URL
  const imageLink = baseLink + '/dogs/image/' + dog.id
  const loadPage = (async () => {
    try {
      let res = await http.get(props, "/dogs/" + id)

      setDog(res)
      setFavourite(res.isFavourite)

      let res2 = await http.get(props, "/breeds")
      setBreeds(res2)

    } catch (ex) {

      console.dir(ex)
    }
  })
  React.useEffect(() => {
    loadPage()
  }, []);



  const editClick = () => {
    setShowEditModal(true)
  }
  const handleCancel = () => {
    setShowEditModal(false)
  }
  const onEditFormFinish = (values) => {
    (async () => {
      try {
        //ignore image field
        const { image, ...data } = values

        const res = await http.put(props, "/dogs/" + id, { param: data, successMsg: "update successfully" })

        //props.navigate("/signin")
        setShowEditModal(false)
        loadPage()
      } catch (ex) {

        console.dir(ex)
      }

    })()
  }
  const handleFavourite = (val) => {

    (async () => {
      try {
        console.log(val)
        let favouriteLink = val ? 'favourite' : 'unfavourite'

        console.log("put")
        await http.put(props, `/users/${favouriteLink}/${id}`, { needLoading: false })
        setFavourite(val)


      } catch (ex) {

        console.dir(ex)
      }

    })()
  }

  return (
    <>
      <DogModalForm isShow={showEditModal} breeds={breeds} handleCancel={handleCancel} onFormFinish={onEditFormFinish} dog={dog} loading={props.app.loading} fileList={[
        {
          uid: '1',
          name: 'image.png',
          status: 'done',
          url: imageLink,
        }
      ]} />
      <div
        className="templates-wrapper"
      >
        <div className="banner3" style={{ "textAlign": "left" }}>
          <div className="home-page-wrapper content9-wrapper">
            <div className="home-page content9">
              <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>
                  {props.breadcrumb}
                  <div className="site-layout-content">

                    <Row>
                      <Col span={6}><img width={'100%'} src={imageLink}></img>
                        <FavouriteButton isFavourite={isFavourite} handleFavourite={(val) => handleFavourite(val)} />
                        {(() => {
                          if (dog.canUpdate) {
                            return (
                              <Button type="link" onClick={editClick} icon={<EditOutlined />}></Button>
                            )
                          }
                        })()}

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
    </>


  )

}


//map state and action in redux define to the component 
const output = (props) => {
  const navigation = useNavigate();
  return <DetailDog {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)




