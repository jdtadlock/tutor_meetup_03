import React from 'react';

const Login = props => (
  <button onClick={props.log}>Login</button>
  // <form>
  //   <input type="email" placeholder="Email" name="email" />
  //   <input type="password" placeholder="Password" name="password" />
  //   <button onClick={props.log}>Submit</button>
  // </form>
);

export default Login;