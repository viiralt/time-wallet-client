const api = 'http://localhost:3006';
const token = window.localStorage.getItem('token');
const base64 = require('base-64');


export const fetchMe = () =>{
  const params = {
    headers:{
      token:token}}
  return fetch(`${api}/me`, params)
  .then(data => data)
}

export const fetchSignIn = (email, password) => {
  const params = {
    method: 'GET',
    headers:{Authorization: 'Basic ' + base64.encode(email + ':' + password)}
  };
  return fetch(`${api}/signin`, params)
  .then((data) => {
    if (data.status === 200) return data;
    // ELSE DO SOMETHING IF THE PASSWORD WAS WRONG/ EMAIL
  })
  .then((data) => data.json())
}


export const fetchMyAskTasks = () => {
  const params = {
    method:'GET',
    headers:{token:token}
  }
  return fetch(`${api}/myAskTasks`, params)
  .then(data => data.json())
}

export const fetchMyDoTasks = () => {
  const params = {
    method:'GET',
    headers:{token:token}
  }
  return fetch(`${api}/myDoTasks`, params)
  .then(data => data.json())
}

export const fetchPostTask = (task) => {
  const params = {
    method:'POST',
    body:JSON.stringify(task),
    headers:{
      token:window.localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }}
  return fetch(`${api}/task`, params)
}

export const fetchSearchTasks = () => {
  const params = {
    headers:{
      token:token
    }
  };
  return fetch(`${api}/searchTasks`, params)
  .then(data => data.json())
}

export const requestToDoTask = (taskId, userId) => {
  const params = {
    method: 'PUT',
    body: JSON.stringify({status:'User Requested', userDo:userId}),
    headers:{
      token:token,
      'Content-Type': 'application/json'
    }
  };
  return fetch(`${api}/task/${taskId}`, params)
  .then(data => data.json())
}

export const fetchUsers = (userList) => {
  const params = {
    method:'GET',
    headers:{token:token}
  }
  return fetch(`${api}/getUsers/${userList}`, params)
  .then(data => data.json())
}

export const confirmTask = (taskId, userId) => {
  const params = {
    method:'PUT',
    body: JSON.stringify({status:'Request Accepted', userDo:userId}),
    headers:{
      token:token,
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${api}/task/${taskId}`, params)
  .then(data => {console.log(data);})

}
