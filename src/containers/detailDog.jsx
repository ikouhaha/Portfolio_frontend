import React, { useEffect, useState } from "react";
import { Modal,Icon, Layout, Row, Col, Button, Card, Avatar, Descriptions, Badge, Breadcrumb } from 'antd';
import { useNavigate, Link, useParams } from 'react-router-dom';

import LoginForm from '../components/LoginForm'
import * as http from '../common/http-common'
import { EditOutlined } from '@ant-design/icons';
import { MessageOutlined,ExclamationCircleOutlined ,DeleteOutlined} from '@ant-design/icons';
import FavouriteButton from "../components/FavouriteButton";
import { getAllActionMap, getAllStateMap, uuid } from "../common/utils";
import { connect } from 'react-redux';
import DogModalForm from "../components/DogModalForm";
import CommentObj from "../components/Comment"

const { confirm } = Modal;


const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;
function DetailDog(props) {
  const { id } = useParams();
  
  const [showEditModal, setShowEditModal] = useState(false)
  const [isFavourite, setFavourite] = useState(false)
  const [dog, setDog] = useState({ breed: { weight: {}, height: {} } })
  const [breeds, setBreeds] = useState([])
  const baseLink = process.env.REACT_APP_BASE_URL+process.env.REACT_APP_API_VERSION_LINK
  const imageLink = baseLink + '/dogs/image/' + id
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
  const handleDelete = (id,values) => {
    (async () => {
      try {
        console.log(id,values)

        const res = await http.del(props, `/dogs/${id}/${values.companyCode}`, { successMsg: "delete successfully" })
        props.navigate(-1)
      } catch (ex) {

        console.dir(ex)
      }

    })()
  }
  const showDeleteModal = () => {
    confirm({
        title: 'Are you sure delete this dog?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            return handleDelete(dog.id,dog)
        },
        onCancel() {

        },
    });

}
  const onEditFormFinish = (id,values) => {
    (async () => {
      try {
        //ignore image field
        const { image, ...data } = values
        console.log(values)
        setShowEditModal(false)
        const res = await http.put(props, "/dogs/" + id, { param: data, successMsg: "update successfully" })

        //props.navigate("/signin")
        
        loadPage()
      } catch (ex) {

        console.dir(ex)
      }

    })()
  }
  const handleFavourite = (val) => {

    (async () => {
      try {
        await http.put(props, `/favourites/${id}/${val}`, { needLoading: false })
        setFavourite(val)


      } catch (ex) {

        console.dir(ex)
      }

    })()
  }

  return (
    <>
      <DogModalForm key={'modal'+id} isShow={showEditModal} breeds={breeds} handleCancel={handleCancel} onFormFinish={onEditFormFinish} dog={dog} loading={props.app.loading} fileList={[
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

                    <Row key={uuid()}>
                      <Col key={uuid()} span={6}><img width={'100%'} src={imageLink}></img>
                        <FavouriteButton key={uuid()} loading={props.app.loading} type="text" isFavourite={isFavourite} handleFavourite={(val) => handleFavourite(val)} />
                        {(() => {
                          let childrens = []
                          if (dog.canUpdate) {
                            childrens.push(<Button key={uuid()} onClick={editClick} type="text"><EditOutlined key="edit" /></Button>)
                          }
                          if (dog.canDelete) {
                            childrens.push(<Button key={uuid()} onClick={showDeleteModal} type="text"><DeleteOutlined key="delete" /></Button>)
                          }
                     
                          return childrens
                        })()}

                      </Col>
                      <Col key={uuid()} span={1}></Col>
                      <Col key={uuid()} span={17}>
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
                    <CommentObj  dog={dog}/>
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


