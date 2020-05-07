import React, {Component} from 'react';
import {connect} from 'react-redux';
import {completeToDo} from '../actions';
const ReactMarkdown = require('react-markdown');

class ListItem extends Component {
  completeClick = completeTodoId => {
    const {completeToDo} = this.props;
    completeToDo(completeTodoId);
  };
  render() {
    const{todoId, todo} = this.props;
    const convDate = Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(todo.date);
    return (
      <div className="mw7 center">
        <div key="toDoName" className="hide-child br3 hidden ba b--black-10 w-90 center mt3 to-do-list-item pa3">
          <ReactMarkdown
            source={todo.content}
            className="tl">
          </ReactMarkdown>
          <div className="child">
            <a onClick={() => this.completeClick(todoId)} className="f6 link dim br-pill ba ph1 pv1 white dib" href="#0">delete</a>
          </div>
        </div>
        <p className="tr f7 mt1 b--black-10 w-90 center">{convDate}</p>
      </div>

    );
  }
}

export default connect(null, {completeToDo})(ListItem);