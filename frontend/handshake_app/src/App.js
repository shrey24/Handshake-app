import React, {Component} from 'react';
import Main from './components/Main'
import {BrowserRouter, Route} from 'react-router-dom';


//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages   
      <div>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </div>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
