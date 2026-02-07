import { getStorageItem, removeStorageItem } from "./utils.js";
import { AUTH_KEY } from "../constants/authConstants.js";


const host = 'http://localhost:3030';


async function request(method,url,data){

    const options = {
        method,
        headers:{}
    }
    if(data != undefined){
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
 
    }
    const userData = getStorageItem(AUTH_KEY)
    if(userData != null){
        const token = userData.accessToken;
        options.headers['X-Authorization'] = token

    }
    try {
        const response = await fetch(host + url, options)
        let result;
        if(response.status != 204){
            result = await response.json()
        }
        if(!response.ok){
            if(response.status == 403){
                removeStorageItem(AUTH_KEY)
            }
            const error = result
            throw error
        }

        return result

        
    } catch (error) {

        alert(error.massage)
        throw error
        
    }

}
export const get = request.bind(null,'get')
export const post = request.bind(null,'post')
export const edit = request.bind(null,'put')
export const remove = request.bind(null,'delete')