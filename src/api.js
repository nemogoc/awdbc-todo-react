const API_URL = "/api/todos";

export async function getTodos() {
  return fetch(API_URL)
    .then(resp => {
      if(!resp.ok){
        if(resp.status >= 400 && resp.status < 500){
          //with 4XX error, probably error message in resp, want to display that
          return resp.json().then(data => {
            throw {errorMessage: data.message};
          });
        }
        else {
          throw {errorMessage: "Server not responding, please try again later"};
        }
      }
      return resp.json()
    })
}

export async function createTodo(newTodo) {
  return fetch(API_URL, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({name: newTodo})})
    .then(resp => {
      if(!resp.ok){
        if(resp.status >= 400 && resp.status < 500){
          //with 4XX error, probably error message in resp, want to display that
          return resp.json().then(data => {
            throw {errorMessage: data.message};
          });
        }
        else {
          throw {errorMessage: "Server not responding, please try again later"};
        }
      }
      return resp.json()
    })
}

export async function removeTodo(id) {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(resp => {
      if(!resp.ok){
        if(resp.status >= 400 && resp.status < 500){
          //with 4XX error, probably error message in resp, want to display that
          return resp.json().then(data => {
            throw {errorMessage: data.message};
          });
        }
        else {
          throw {errorMessage: "Server not responding, please try again later"};
        }
      }
      return resp.json()
    })
}

export async function updateTodo(id, completed){
  return fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({completed: !completed})
  })
    .then(resp => {
      if(!resp.ok){
        if(resp.status >= 400 && resp.status < 500){
          //with 4XX error, probably error message in resp, want to display that
          return resp.json().then(data => {
            throw {errorMessage: data.message};
          });
        }
        else {
          throw {errorMessage: "Server not responding, please try again later"};
        }
      }
      return resp.json()
    })
}
