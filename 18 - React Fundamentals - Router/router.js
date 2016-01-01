import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'director';

class App extends React.Component {
  componentDidMount () {
    var router = Router({
      '/author': function () { console.log("author"); },
      '/books': [function () { console.log("books"); }, function() {
        console.log("An inline route handler.");
      }],
      '/books/view/:bookId': function (bookId) {
        console.log("viewBook: bookId is populated: " + bookId);
      }
    });

    router.init();

  }

  render () {
    return (
      <ul>
        <li><a href="#/author">#/author</a></li>
        <li><a href="#/books">#/books</a></li>
        <li><a href="#/books/view/12">#/books/view/12</a></li>
      </ul>
    );
  }
}
export default App

ReactDOM.render(<App/>, document.getElementById('app'))
