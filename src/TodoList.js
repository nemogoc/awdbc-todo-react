import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api';

class TodoList extends Component {
  constructor(props){
    super(props);

    this.state = {todoItems: []};

    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount(){
    this.loadTodos()
  }

  async loadTodos(){
    let todos = await apiCalls.getTodos();
    this.setState({todoItems: todos})
  }

  async addTodo(newTodo){
    let returnedTodo = await apiCalls.createTodo(newTodo);
    this.setState({todoItems: [...this.state.todoItems, returnedTodo]});
  }

  async deleteTodo(id){
    await apiCalls.removeTodo(id);
    const todos = this.state.todoItems.filter(todo => todo._id !== id);
    this.setState({todoItems: todos});
  }

  async toggleTodo(id, completed){
    let updatedTodo = await apiCalls.updateTodo(id, completed)
    const todos = this.state.todoItems.map(todo =>
      (todo._id === updatedTodo._id) ? updatedTodo : todo);
    this.setState({todoItems: todos})
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
