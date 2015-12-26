import React, { PropTypes } from 'react'
import Jumbotron from './Jumbotron.jsx!'
class Lead extends React.Component {
  render () {
    return (
      <Jumbotron>
        <h1>{this.props.title}</h1>
        <p className="lead">This is the message for {this.props.title} page</p>
      </Jumbotron>
      )
  }
}

export default Lead;
