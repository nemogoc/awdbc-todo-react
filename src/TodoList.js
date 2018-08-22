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

  deleteTodo(id){
    fetch(`${API_URL}/${id}`, {
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
      .then(() => {
        const todos = this.state.todoItems.filter(todo => todo._id !== id);
        this.setState({todoItems: todos})
      })
  }

  toggleTodo(id, completed){
    fetch(`${API_URL}/${id}`, {
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
      .then((updatedTodo) => {
        const todos = this.state.todoItems.map(todo =>
          (todo._id === updatedTodo._id) ? updatedTodo : todo);
        this.setState({todoItems: todos})
      })
  }

  render(){
    let {todoItems} = this.state;
    let items = <div>Loading...</div>;
    if(todoItems && todoItems.length > 0){
      items = todoItems.map(item => (<TodoItem
          key={item._id}
          toggleTodo={this.toggleTodo.bind(this, item._id, item.completed)}
          deleteTodo={this.deleteTodo.bind(this, item._id)}
          {...item}
        />
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
