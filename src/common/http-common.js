import axios from 'axios'



export default axios.create({
    baseURL:"http://localhost:10888/api/v1",
    headers:{
        "Content-type":"applications/json"
    }
})