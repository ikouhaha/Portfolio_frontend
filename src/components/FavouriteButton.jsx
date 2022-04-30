

import React, { useState } from 'react';
import { Button } from 'antd';
//import articles from './data/articles.json'

import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import PropTypes from 'prop-types';


FavouriteButton.propTypes = {
  type: PropTypes.string,
  loading: PropTypes.bool.isRequired,
}


function FavouriteButton(props) {
  const [loading, setLoading] = useState(false)
  React.useEffect(() => {
    // props.action.load({isFavourite:true})
    setLoading(false)
  }, [props.isFavourite]);

  const handleFavourite = (val) => {

    setLoading(true)


    return props.handleFavourite(val)



  }

  if (props.isFavourite) {
    return (<Button loading={loading} type={props.type || 'link'} onClick={() => handleFavourite(false)} icon={<HeartFilled />}></Button>)
  } else {
    return (<Button loading={loading} type={props.type || 'link'} onClick={() => handleFavourite(true)} icon={<HeartOutlined />}></Button>)
  }

}
export default FavouriteButton;