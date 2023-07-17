import axios from 'axios';

 const http = axios.create({
    baseURL:'http://localhost:4002',
	withCredentials: true,
	headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
})

export default http;
export const appConfigApi={
    register:'/api/register',
    login:'http://localhost:4002/api/login',
    profile:'/api/profile',
    logout:'/api/logout'
}

/*
when you want to set cookie in browser and want to send it on every request , 
with fetch you have to add some below configration such as credentials:"include"

fetch(appConfigApi.profile,{
    method:'GET',
    headers:{
      Accept:'application/json',
      "Content-Type":"application/json"
    },
    credentials:"include"
  })
*/