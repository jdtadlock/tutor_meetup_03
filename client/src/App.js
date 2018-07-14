import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import Auth from './Auth';

import Login from './components/Login';
import Callback from './components/Callback';

class App extends Component {
  state = {
    user: {},
    logged_in: false,
    loaded: false
  }

  componentDidMount = () => {
    axios.get('/isauth').then(res => {
      console.log(res.data);
      this.setState({
        user: {...res.data.user},
        logged_in: res.data.user ? true : false,
        loaded: true
      });
    });
  }

  login = () => {

    axios.post('/login', {email: 'jt7903@gmail.com', password: 'password'})
      .then(res => {
        this.setState({
          user: res.data.user,
          logged_in: res.data.user ? true : false
        })
      });
  } 

  logout = () => {

    axios.get('/logout')
      .then(res => {
        console.log('fired');
        this.setState({user: {}, logged_in: false})
      });
  } 


  render() {
    const auth = new Auth(this.props.history);
    const isAuth = auth.isAuthenticated();

    return (
      <div className="App">
        {this.state.loaded ?
          <header>
            <h3>Logo</h3>

            <nav>
              {/* isAuth ?
              <div>
              <span>Welcome, {localStorage.getItem('user_email')}</span>
              <span onClick={auth.logout}>Logout</span>
            </div> :
              <div>
              <span onClick={this.login}>Login</span>
            </div> */}
              {
                <div>
                  {this.state.logged_in ?
                    <div>
                      <span>Welcome, {this.state.user.email}</span>
                      <span onClick={this.logout}>Logout</span>
                    </div> :
                    <div>
                      <span onClick={this.login}>Login</span>
                    </div>}
                </div>
              }
            </nav>
          </header>
        : ''}

        {!this.state.loaded ? <h2>Loading...</h2> : ''}

        {/* <Route path="/login" render={() => (
          <Login log={auth.login} />
        )} />

        <Route path="/callback" render={() => 
          <Callback processAuth={auth.processAuthentication} />
        }/> */}

      </div>
    );
  }
}

export default withRouter(App);
