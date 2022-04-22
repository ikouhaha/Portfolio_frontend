

import { Card, Avatar, Button } from 'antd';
import { EyeOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React, { Children, useState } from 'react';
import { config } from '../common/config';
import FavouriteButton from './FavouriteButton';
import DogModalForm from './DogModalForm';
import {Link} from 'react-router-dom'
const { Meta } = Card;



function DogCard(props) {
    const { ...dog } = props.dog
    const [isFavourite, setFavourite] = useState(dog.isFavourite)
    const [showActionModal, setShowActionModal] = useState(false)

    const handleFavourite = (val) => {

        setFavourite(val)
        return props.handleFavourite(val, dog.id)
    }

    const handleCancel = () => {
        setShowActionModal(false)
    }

    const showModal = () => {
        setShowActionModal(true)
    }
    const onFormFinish = (values) => {
        setShowActionModal(false)
        return props.onFormFinish(values)
    }

    if (!dog) {
        return <></>
    }

    const actions = () => {
        let childrens = [
            <FavouriteButton isFavourite={isFavourite} type="text" key="ellipsis" handleFavourite={(val) => handleFavourite(val)} />,
            <Button type="text"><Link to={`dog/${dog.id}`}><EyeOutlined key="view" /></Link></Button>]
        if (dog.canUpdate) {
            childrens.push(<Button onClick={showModal} type="text"><EditOutlined key="edit" /></Button>)
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
                onFinish={onFormFinish}
                loading={props.app.loading}

            />

            <Card
                style={{ width: '100%' }}
                cover={
                    <img
                        style={{ height: 250, objectFit: 'contain', width: '100%' }}
                        alt="example"
                        src={config.baseUrl + '/dogs/image/' + dog.id}
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