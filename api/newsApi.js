import axios from 'axios'


const newsApi = axios.create({
    baseURL: '/api'
})


export default newsApi