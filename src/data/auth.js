// import { get, post } from "./api"

// const endPoints ={
//     login: '/users/login',
//     register: '/users/register',
//     logout: '/users/logout'
// }


// export async function login(email,password){
//     return await post(endPoints.login, {email,password})
// }
// export async function register(email,password){
//     return await post(endPoints.register, {email,password})
// }
// export function logout(){
//     return get(endPoints.logout)
// }
import { supabase } from "./supabaseClient";

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data.user;
}

export async function register(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}


