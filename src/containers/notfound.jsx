import React from "react";
import { Result, Button } from 'antd';
import { useNavigate,Link } from 'react-router-dom';

function NotFound() {  
  const navigate = useNavigate();
  
  return (
    <>
      <Result status="404" title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={ <Link to="/" className='header-nav-link'><Button type="primary">Back Home</Button></Link>} />
    </>
  );    
}  
export default NotFound;