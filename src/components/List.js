import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ListItem from './ListItem';
import "./style.css";
import {timeStamp} from '../config/firebase';

class List extends Component {
  state = {
    showForm: false,
    formValue: ""
  };

  inputChange = event => {
    this.setState({formValue: event.target.value});
  };

  formSubmit = event => {
    const {formValue} = this.state;
    const {addToDo} = this.props;
    event.preventDefault();
    addToDo({ content: formValue, date: timeStamp });
    this.setState({formValue: ""});
  };

  renderTitle = () => {
    const {showForm} = this.state;
    return (
      <div className="sticky-top bg-white">
          <a className="ml5 mt3 f6 link dim br-pill ba ph3 pv2 mb2 dib black fl" href="http://pwplibsearch:5000">&#60;=</a>
          <h2 className="tc dib">White Board</h2>
          <div 
            onClick={() => this.setState({showForm: !showForm})}
            className="mr5 dib fr mt3"
          >
          {showForm ? (
            <a className="f6 link dim br-pill ba ph3 pv2 mb2 dib black" href="#0">-</a>
          ) : (
            <a className="f6 link dim br-pill ba ph3 pv2 mb2 dib black" href="#0">+</a>
          )}
          </div>
      </div>
    );
  };

  renderForm = () => {
    const {showForm, formValue} = this.state;
    if (showForm) {
      return (
        <div id="todo-add-form" className="bg-white">
          <form>
            <div className="mw7 center">
              <textarea
                name="comment"
                className="center w-90 db border-box h4 pa3 ba b--black-10 ma3 br3" 
                value={formValue}
                onChange={this.inputChange}
                id="comment"
                type="text"
                placeholder="Image => ![Image Name](Image URL)&#10;Bold  => **Bold Content** or __Bold Content__&#10;Title => # or ## or ### or #### Title Content&#10;List  => - List Content or + List Content&#10;Link  => [Link Name](Link URL)"
              />
              <a className="f6 link dim br-pill ba ph3 pv2 mb2 dib black" onClick={this.formSubmit} href="#0">blablabla...</a>
            </div>
          </form>
        </div>
      );
    }
  };
  renderToDo() {
    const {data} = this.props;
    if (data !== null) {
      const toDos = Object.entries(data).reverse().map((item) => 
            <ListItem key={item[0]} todoId={item[0]} todo={item[1]}/>
      );
      if (toDos.length !== 0) {
        return toDos;
      }
    } 
    return (
      <div className="tc mt5">
        <p>Add some cool stuff!</p>
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchToDos();
  }
  render() {
    return (
      <div className="to-do-list-container">
        <div className="tc">
          {this.renderTitle()}
          <div className="mb8">
            {this.renderToDo()}
          </div>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({data}) => {
  return {
    data
  }
}

export default connect(mapStateToProps, actions)(List);