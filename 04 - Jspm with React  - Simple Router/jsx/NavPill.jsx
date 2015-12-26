import React, { PropTypes } from 'react'

class NavPill extends React.Component {
  render () {
    return (
      <li className={this.props.active && 'active'}>
        <a href="#" onClick={this.props.myUpdate}>{this.props.aPage}</a>
      </li>
      )
  }
}

export default NavPill;
