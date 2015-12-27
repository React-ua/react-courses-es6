import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Home from './routes/home'
// uncomment next line to enable the dev-tools.
import 'mobservable-react-devtools';
//addLocaleData(en)
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

class RenderForcer extends React.Component {
  constructor () {
    super()
  }
  componentWillMount () {
    //this.forceUpdate()  // a little hack to help us rerender when this module is reloaded
  }
  render () {
    return <div locale='en'>
      <Router>
        <Route path='/' component={Home}/>
     </Router>
   </div>
  }
}

ReactDOM.render((
  <RenderForcer/>
), document.getElementById('app'))
