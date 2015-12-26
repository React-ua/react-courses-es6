import React, { PropTypes } from 'react'
import FeatureButton from './FeatureButton.jsx!'
class Feature extends React.Component {
  render () {
    return (
      <div className="col-md-4">
        <h2>{this.props.title}</h2>
        <p>
          Donec id elit non mi porta gravida at eget metus.Fusce dapibus, tellus ac cursus commodo.
        </p>
        <p>
          <FeatureButton
            update={this.props.update}
            active={this.props.active}
          />
        </p>
      </div>
      )
  }
}

export default Feature;
