import axios from "axios"

const useCrud = ()=>{
    const post = async(route : string , values : any , token? : any)=>{

        console.log(token)


        const response = await axios.post(`http://192.168.136.46:8080/${route}`,values,{
            headers : {
                Authorization : `Barear ${token}`
            }
        })

        if(response.status >=200 && response.status<300){
            return response.data
        }else{
            throw Error('error')
        }
    }


    const get = async (route : string, token? : any)=>{
        
        console.log('here')

        const response = await axios.get(`http://192.168.136.46:8080/${route}`,{
            headers : {
                Authorization : `Barear ${token}`
            }
        })

        if(response.status >=200 && response.status<300){
            return response.data
        }else{
            throw Error('error')
        }
    }

    const update = async(route : string , values? : any , token? : any)=>{
        const response = await axios.patch(`http://192.168.136.46:8080/${route}`,values,{
            headers : {
                Authorization : `Barear ${token}`
            }
        })

        if(response.status >=200 && response.status<300){
            return response.data
        }else{
            throw Error('error')
        }
    }

    const remove = async(route : string , token? : any)=>{

        console.log(token)
        const response = await axios.delete(`http://192.168.136.46:8080/${route}`,{
            headers : {
                Authorization : `Barear ${token}`
            }
        })

        if(response.status >=200 && response.status<300){
            return response.data
        }else{
            throw Error('error')
        }

    }

    return {post , get , update , remove}

}


export default useCrud