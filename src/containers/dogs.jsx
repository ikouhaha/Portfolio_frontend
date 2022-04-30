import React, { useState } from "react";
import { Pagination, Layout, Row, Col} from 'antd';
import { useNavigate } from 'react-router-dom';


import * as http from '../common/http-common'



import { getAllActionMap, getAllStateMap, getFilterString, loading, done } from "../common/utils";
import { connect } from 'react-redux';
import DogFilter from "../components/DogFilter";
import DogCard from "../components/DogCard";
import DogModalForm from "../components/DogModalForm";





const {  Footer, Content } = Layout;
function Dogs(props) {
  

  
  const [showActionModal, setShowActionModal] = useState(false)
  const [dogs, setDogs] = useState([])
  const [breeds, setBreeds] = useState([])
  const [filter, setFilter] = useState({ page: 1, limit: 8 })
  const [dogCount, setDogCount] = useState(0)
  const [canCreate, setCanCreate] = useState(false)
  const [favourites,setFavourites] = useState({})

  const loadPage = (async () => {
    try {
      //get dogs
      loading(props)
      console.log(getFilterString(filter))
      let res = await http.get(props, `/dogs?${getFilterString(filter)}`, { needLoading: false })
      console.log(res)
      setDogs(res.list)
      setDogCount(res.totalCount)
      setCanCreate(res.canCreate)
      setFavourites(res.favourites)
      //get all breeds
      let breeds = await http.get(props, "/breeds", { needLoading: false })
      setBreeds(breeds)

      done(props)

    } catch (ex) {
      done(props)
      console.dir(ex)
    }
  })
  React.useEffect(() => {
    loadPage()
  }, [filter]);


  const handleCreateClick = () => {
    console.log("create click")
    setShowActionModal(true)

  }

  const handleDelete = (id, values) => {
    (async () => {
      try {
        console.log(id, values)

        await http.del(props, `/dogs/${id}/${values.companyCode}`, { successMsg: "delete successfully" })
        loadPage()
      } catch (ex) {

        console.dir(ex)
      }

    })()
  }

  const onFormFinish = (id, values) => {
    (async () => {
      try {
        console.log(id, values)
        //ignore image field
        const { image, ...data } = values
        
        await http.put(props, "/dogs/" + id, { param: data, successMsg: "update successfully" })
        loadPage()
      } catch (ex) {

        console.dir(ex)
      }

    })()
  }

  const onCreateFinish = (id, values) => {
    (async () => {
      try {
        setShowActionModal(false)
        console.log(id, values)
        //ignore image field
        const { image, ...data } = values
        console.log(data)
        await http.post(props, "/dogs", { param: data, successMsg: "create successfully" })
        
        loadPage()
      } catch (ex) {

        console.dir(ex)
      }

    })()
  }


  const onFilterFinish = (values) => {
    let ofilter = { ...filter, ...values }
    Object.keys(ofilter).forEach(key => ofilter[key] === undefined && delete ofilter[key])
    setFilter(ofilter)
  }
  const handlePageChange = async (val) => {
    let ofilter = { ...filter }
    ofilter["page"] = val
    setFilter(ofilter)

  }
  const handleFavourite = (val, id) => {

    (async () => {
      try {
        await http.put(props, `/favourites/${id}/${val}`, { needLoading: false })
        setFavourites({...favourites, [id]:val})
      } catch (ex) {

        console.dir(ex)
      }

    })()
  }

  const renderDogs = () => {
    return dogs.map((dog, index) => (
      <Col span={6} key={'col' + index}  >
        <DogCard
          isFavourite={favourites[dog.id]||false}
          key={'dog' + index}
          dog={dog}
          breeds={breeds}
          app={props.app}
          handleFavourite={handleFavourite}
          eventKey={index}
          onFormFinish={onFormFinish}
          handleDelete={handleDelete}
        >

        </DogCard>
      </Col>
    ));
  }

  return (
    <>
      <DogModalForm
        fileList={[]}
        isShow={showActionModal}
        dog={{ id: -1, createdBy: props.user.id, companyCode: props.user.companyCode }}
        breeds={breeds}
        handleCancel={() => setShowActionModal(false)}
        onFormFinish={onCreateFinish}
        loading={props.app.loading}

      />
      <div
        className="templates-wrapper"
      >
        <div className="banner3" style={{ "textAlign": "left", height: "auto" }}>


          <div className="home-page-wrapper content9-wrapper">
            <div className="home-page content9">

              <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>
                  {props.breadcrumb}
                  <div className="site-layout-content">
                    <DogFilter canCreate={canCreate} breeds={breeds} onFinish={onFilterFinish} handleCreateClick={handleCreateClick} />
                    <Row gutter={[5, 16]}>
                      {renderDogs()}
                    </Row>

                  </div>

                  <Pagination
                    defaultPageSize="8"
                    style={{ textAlign: "center", paddingTop: 15 }}
                    simple
                    showTotal={total => `Total ${total} items`}
                    current={dogCount === 0 ? 0 : filter.page}
                    total={dogCount}
                    onChange={handlePageChange.bind(this)}
                  />
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
  return <Dogs {...props} navigate={navigation} />
}
export default connect(getAllStateMap, getAllActionMap)(output)




