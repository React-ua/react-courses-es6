import React, { PropTypes } from 'react'

class FeatureButton extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			active: false
		};
		this.handelClick = (e) => {
			e.preventDefault();

			this.setState({
			active	: !this.state.active
			});

		};
	}
	render () {
		return (
			<a
				onClick={this.handelClick}
				className={this.state.active && 'btn btn-primary' || 'btn btn-default'}
				href="#"
				role="button">
				View details
			</a>
		)
	}
}

export default FeatureButton;
