import React from 'react';

const TodoItem = ({name, completed, deleteTodo}) => (
      <div>
        {name}
        {completed ? " - completed" : ""}
        <span onClick={deleteTodo}> - Delete</span>
      </div>
    );


export default TodoItem;
