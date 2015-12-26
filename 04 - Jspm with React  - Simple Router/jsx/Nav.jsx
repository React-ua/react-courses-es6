import React, { PropTypes } from 'react'
import NavPill from './NavPill.jsx!'
class Nav extends React.Component {
  render () {
    var navpills =
      this.props.pages.map((aPage,i) => {
          var myUpdate = this.props.update.bind(null,i)
          return (
              <NavPill
                key={i}
                active={this.props.page===aPage}
                myUpdate={myUpdate}
                aPage={aPage}
              />
            )
      })
    return (
      <div className="header">
        <ul className="nav nav-pills pull-right">
          {navpills}
        </ul>
        <h3 className="text-muted">Project name</h3>
      </div>
      )
  }
}

export default Nav;
