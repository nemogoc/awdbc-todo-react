import React, {Component} from 'react';

class TodoItem extends Component {
  constructor(props){
    super(props);

    this.state = {completed: false}
  }

  render() {
    return (
      <div>{this.props.name}</div>
    )
  }
}

export default TodoItem;
