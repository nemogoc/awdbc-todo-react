import React, {Component} from "react";

const API_URL = "/api/todos";

class TodoList extends Component {
  constructor(props){
    super(props);

    this.state = {todoItems: []}
  }

  componentDidMount(){
    this.loadTodos()
  }

  loadTodos(){
    fetch(API_URL)
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
      .then(json => this.setState({todoItems: json}))
  }

  render(){
    return (
      <div>TodoList</div>
    )
  }
}

export default TodoList;