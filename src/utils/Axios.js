import axios from 'axios'



export const key='e74716b01b108603e8cc5344f68a41f2'

 const api =axios.create({
    baseURL:'https://api.themoviedb.org/3',
})

export default api;