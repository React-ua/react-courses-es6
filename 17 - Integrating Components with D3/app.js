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
	//	Using reqwest

	const fields = [{
    name: "val",
    type: "Number",
    min: 1,
    max: 30,
    decimals: 0
}];
const url = 'http://www.mockaroo.com/api/generate.json?count=5&key=1977f1b0' + '&fields=' + encodeURIComponent(JSON.stringify(fields));
			reqwest({
				url: url, //'http://filltext.com/?rows=5&val={randomNumber}',
				type: 'jsonp', // JSONP (or JSON with Padding) to overcome the cross-domain restrictions imposed by browsers.
				 crossOrigin: true,
			success:function(resp){
				console.log(resp);
				this.setState({data:resp})
				this.renderChart(this.state.data)
			}.bind(this)
		})
 //Using JQuery
		// $.ajax({
		//   type: 'GET',
		//   url: 'http://filltext.com/?rows=5&val={randomNumber}',
		// 	dataType:"jsonp",
		// 	crossDomain: true,
		//   success: function(resp){
		// 		this.setState({data:resp})
		// 	 		this.renderChart(this.state.data)
		// 	 	}.bind(this),
		//   error: function() {
		//     // Here's where you handle an error response.
		// 		console.log("a error");
		//   }
		// });
}
	render () {
		return <div id="chart"></div>
	}
}

ReactDOM.render (
	<APP />,
	document.getElementById('app'))
