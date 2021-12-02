import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = ({ color}) => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()} style ={{backgroundColor: color}}
  className='loginbtn' >Log In</button>;
};

LoginButton.defaultProps={
    color:'steelblue'
}

export default LoginButton;