import React, {Component} from 'react';
import Main from './components/Main'
import {BrowserRouter, Route} from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store'
import { loadUser, setAuthTokenToHeaders } from "./actions/auth";

if (localStorage.token) {
  setAuthTokenToHeaders(localStorage.token);
}

//App Component
class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        {/* Use Browser Router to route to different pages */}
        <div>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
