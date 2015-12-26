import React, { PropTypes } from 'react'

class Footer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render () {
    return (
      <div className="footer">
        <p>&copy; Company</p>
      </div>
      )
  }
}

export default Footer;
