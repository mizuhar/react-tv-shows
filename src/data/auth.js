import { get, post } from "./api"

const endPoints ={
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}


export async function login(email,password){
    return await post(endPoints.login, {email,password})
}
export async function register(email,password){
    return await post(endPoints.register, {email,password})
}
export function logout(){
    return get(endPoints.logout)
}

