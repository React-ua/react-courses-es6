class APP extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : []
		};
	}
	renderChart  (dataset) {
		d3.select('#chart').selectAll('div')
		.data(dataset)
		.enter()
		.append('div')
		.attr('class', 'bar')
		.style('height', function (d) {
			return d.val * 5 + 'px';
		});
	}
	componentWillMount (){
			reqwest({
				url: 'http://filltext.com/?rows=5&val={randomNumber}',
				type: 'jsonp',
				 crossOrigin: true,
				success:function(resp){
					this.setState({data:resp})
					this.renderChart(this.state.data)
				}.bind(this)
			})
		}
	render () {
		return <div id="chart"></div>
	}
}

ReactDOM.render (
	<APP />,
	document.getElementById('app'))
