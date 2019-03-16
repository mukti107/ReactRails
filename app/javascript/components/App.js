import React from "react"
import {BrowserRouter as Router, Route} from 'react-router-dom';
import EditPost from './post/Edit';
import PostDetails from './post/Details';
import IndexPost from './post/index';
import Header from './layout/Header'
import {Provider} from 'react-redux';
import store from '../redux/store'

class App extends React.Component {
  render () {
    return (
      <div class="container">
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Route path='/posts' exact component={IndexPost}/>
            <Route path='/posts/add' exact component={EditPost}/>
            <Route path='/posts/:id/edit' exact component={EditPost}/>
            <Route path='/posts/:id' exact component={PostDetails}/>
          </div>
        </Router>
      </Provider>
      </div>
    );
  }
}

export default App