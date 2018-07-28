import React, { Component } from 'react'
import './App.css'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.handleSearch(e.target.value);
  }

  render() {
    return (
      <div>
        <input type='text' placeholder='search' value={this.state.value} onChange={(e)=> this.onChange(e)} />
      </div>
    )
  }
}
