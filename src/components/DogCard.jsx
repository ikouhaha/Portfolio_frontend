

import { Card, Avatar, Button, Modal } from 'antd';
import { EyeOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { Children, useState } from 'react';
import { config } from '../common/config';
import FavouriteButton from './FavouriteButton';
import DogModalForm from './DogModalForm';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { uuid } from '../common/utils'

const { Meta } = Card;

const { confirm } = Modal;

DogCard.propTypes = {
    isFavourite: PropTypes.bool.isRequired,
    dog: PropTypes.object.isRequired,
    breeds: PropTypes.array.isRequired,
    app: PropTypes.object.isRequired,
    handleFavourite: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    onFormFinish: PropTypes.func.isRequired,

}

function DogCard(props) {
    const baseLink = process.env.REACT_APP_BASE_URL
    const [showActionModal, setShowActionModal] = useState(false)
    const dog = { ...props.dog }
    

    
   

    const handleFavourite =  (val) => {
        
         props.handleFavourite(val, dog.id)
    }


    const handleCancel = () => {
        setShowActionModal(false)
    }

    const showModal = () => {
        setShowActionModal(true)
    }

    const showDeleteModal = () => {
        confirm({
            title: 'Are you sure delete this dog?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                return props.handleDelete(dog.id,dog)
            },
            onCancel() {

            },
        });

    }

    const onFormFinish = (id,values) => {
        setShowActionModal(false)
        return props.onFormFinish(id, values)
    }

    if (!dog) {
        return <></>
    }

    const actions = () => {
        if(props.app.load){
            return (<></>)
        }
        let childrens = [
            <FavouriteButton key={uuid()} loading={props.app.loading} isFavourite={props.isFavourite} type="text"  handleFavourite={(val) => handleFavourite(val)} />,
            <Button type="text"><Link to={`dog/${dog.id}`}><EyeOutlined key="view" /></Link></Button>]
        if (dog.canUpdate) {
            childrens.push(<Button onClick={showModal} type="text"><EditOutlined key="edit" /></Button>)
        }
        if (dog.canDelete) {
            childrens.push(<Button onClick={showDeleteModal} type="text"><DeleteOutlined key="delete" /></Button>)
        }
        return childrens
    }

    return (
        <>
            <DogModalForm
                isShow={showActionModal}
                dog={dog}
                breeds={props.breeds}
                handleCancel={handleCancel}
                onFormFinish={onFormFinish}
                loading={props.app.loading}
                fileList={[
                    {
                        uid: '1',
                        name: 'image.png',
                        status: 'done',
                        url: baseLink + '/dogs/image/' + dog.id,
                    }
                ]}
            />
            <Card
                loading={props.app.loading}
                style={{ width: '100%' }}
                cover={
                    <img
                        style={{ height: 250, objectFit: 'contain', width: '100%' }}
                        alt="example"
                        src={baseLink + '/dogs/image/' + dog.id}
                    />
                }
                actions={[...actions()]}
            >
                <Meta
                    title={dog.name}
                    description={dog.about}
                />
            </Card>
        </>
    )

}




export default DogCard;