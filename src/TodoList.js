import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const API_URL = "/api/todos";

class TodoList extends Component {
  constructor(props){
    super(props);

    this.state = {todoItems: []};

    this.addTodo = this.addTodo.bind(this);
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

  addTodo(newTodo){
    console.log("Adding Todo From TodoList Component: ", newTodo);
    fetch(API_URL, {
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
      .then(returnedTodo => this.setState({todoItems: [...this.state.todoItems, returnedTodo]}))
  }

  render(){
    let {todoItems} = this.state;
    let items = <div>Loading...</div>;
    if(todoItems && todoItems.length > 0){
      items = todoItems.map(item => (
        <TodoItem key={item._id} {...item} />
      ));
    }
    return (
      <div>
        <div>TodoList</div>
        <TodoForm addTodo={this.addTodo} />
        {items}
      </div>
    )
  }
}

export default TodoList;
