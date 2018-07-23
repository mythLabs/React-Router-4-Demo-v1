import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import Hello from './HelloComponent';
import About from './AboutComponent';
import Books from './BooksComponent';
import Home from './HomeComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
          <ul>
            <li><Link to="/hello">Hello</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
            <hr/>
           
        <Switch>
           <Route path="/" exact={true} component={Home} />
           <Route path="/hello" component={Hello} />
           <Route path="/hello/goodmorning" render={() => { return      <h1>Goodmorning</h1> }} />
           <Route path="/about" component={About} />
           <Route path="/books" component={Books} />
           <Route path="/login" component={Login}/>
          <PrivateRoute authed={fakeAuth.isAuthenticated} path="/admin" component={Admin} />
           <Route render={() => { return      <h1>Page Not Found</h1> }} />
        </Switch>

           </div>
        </div>
      </Router>
    );
  }
}

const Admin = () => {
  return (
    <div className="jumbotron">
      <h3 className="display-3">Admin Access granted</h3>
    </div>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class Login extends React.Component {
  
    constructor() {
      super();
  
      this.state = {
        redirectToReferrer: false
      }
      // binding 'this'
      this.login = this.login.bind(this);
    }
  
    login() {
  
      fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true })
      })
    }
  
    render() {
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      const { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) {
        return (
          <Redirect to={from} />
        )
      }
  
      return (
        <div className="jumbotron">
            <h1 className="display-3">Login required</h1>
            <p className="lead">You must log in to view the page at {from.pathname}.</p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" onClick={this.login} role="button">Login</a>
            </p>
        </div>
      )
    }
  }
  
  /* A fake authentication function */
  export const fakeAuth = {
  
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
       setTimeout(cb, 100)
    },
  }

export default App;
