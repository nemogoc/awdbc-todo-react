import React from 'react';

const TodoItem = ({name, completed}) => (
      <div>
        {name}
        {completed ? " - completed" : ""}
      </div>
    );


export default TodoItem;
