import React from 'react';
import ReactDOM from 'react-dom';
class HelloWorld extends React.Component {
  constructor() {
    super()

    this.state = {
      subject: 'World!'
    }
  }

  render () {
    return (
      <div> Hello
         {this.state.subject}</div>
    )
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById('app'));
