import React from 'react'
import ReactDOM from 'react-dom'
import {observable, observe} from 'mobservable'
import {observer} from 'mobservable-react'
var timerData = observable({
    secondsPassed: 0
});

setInterval(function() {
    timerData.secondsPassed++;
}, 1000);

@observer
class Timer extends React.Component {
    render() {
        return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
    }
}

ReactDOM.render(<Timer timerData={timerData} />, document.getElementById('app'));
