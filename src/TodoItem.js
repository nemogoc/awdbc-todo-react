import React from 'react';

const TodoItem = ({name, completed, toggleTodo, deleteTodo}) => (
  <div>
    <span onClick={toggleTodo}> {name}</span>
    {completed ? " - completed" : ""}
    <span onClick={deleteTodo}> - Delete</span>
  </div>
);


export default TodoItem;
