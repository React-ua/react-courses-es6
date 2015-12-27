import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observable} from 'mobservable';
import {observer} from 'mobservable-react';

// uncomment next line to enable the dev-tools.
import 'mobservable-react-devtools';

const appState = observable({
    timer: 0
});

appState.resetTimer = function() {
    appState.timer = 0;
};

setInterval(() => {
    appState.timer += 1;
}, 10000);

@observer
class TimerView extends Component {
     render() {
        return (<div>
          <hr/>
          <h1>mobservable example</h1>
          <hr/>
            <button onClick={this.onReset}>
                Seconds passed: {this.props.appState.timer}
            </button>
          </div>
        );
     }

     onReset = () => {
     	this.props.appState.resetTimer();
     }
};

ReactDOM.render(<TimerView appState={appState} />, document.getElementById('app'));
