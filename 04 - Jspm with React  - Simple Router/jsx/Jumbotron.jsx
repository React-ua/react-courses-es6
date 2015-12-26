import React, { PropTypes } from 'react'

class Jumbotron extends React.Component {
  render () {
  return <div className="jumbotron">{this.props.children}</div>
  }
}

export default Jumbotron;
