class  Transformer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      input:'/** React with babel*/',
      output:'',
      err:''
    }
    this.handelUpdate= (e) => {
      const code = e.target.value;
      try {
        this.setState({
          output:babel.transform(code).code,
          err:''
        })
      }
      catch(err){
        this.setState({
          err:err.message
        })
      }
    }
  }
  render () {
    return (
      <div>

        <div className="row">

          <p className="alert alert-danger">&nbsp;{this.state.err}</p>

        </div>

        <div className="row">

          <textarea
            className="col-sm-6 input-lg"
            defaultValue={this.state.input}
            onChange={this.handelUpdate} />

          <pre className="col-sm-6 input-lg">
            {this.state.output}
          </pre>

        </div>


      </div>
    )
  }
}

ReactDOM.render(
  <Transformer />,
  document.getElementById('app')
)
