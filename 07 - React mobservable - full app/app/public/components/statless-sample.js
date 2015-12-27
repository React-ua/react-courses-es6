import React, {PropTypes} from 'react'
import counter from '../stores/example-store'
import {observer} from 'mobservable-react'

class TimerView extends React.Component {
     render() {
        return (<div>
           click to resetTimer
            <button onClick={this.onReset}>
                Seconds passed: {counter.timer}
            </button>
          </div>
        );
     }

     onReset = () => {
     	counter.resetTimer();
     }
}

TimerView.propTypes = {
  name: PropTypes.string
}

export default observer(TimerView)
