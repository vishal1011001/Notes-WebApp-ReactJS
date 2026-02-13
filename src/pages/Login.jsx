import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [wantToLogin, setWantToLogin] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const credentials = {
      userName: userName,
      email: email,
      password: password
    }

    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if(response.ok) {
        const data = await response.json();
  
        localStorage.setItem('token', data.token);
        console.log(localStorage.getItem('token'));
  
        navigate('/');
      } else {
        setHasLoginFailed(true);
      }
    } catch (error) {
      console.error('Registration Unsuccesful', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = {
        userName: userName,
        email: email,
        password: password,
      }

      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      if(response.ok) {
        const data = await response.json();

        localStorage.setItem('token', data.token);
        console.log(localStorage.getItem('token'));
  
        navigate('/');
      } else {
        setHasLoginFailed(true);
      }

    } catch (error) {
      console.error("Error logging in: ", error);
    }
  }

  return (
    <div className="login-page-main">
      <h1 style={{'color': 'white', 'margin-top':'0px'}}>Welcome to VNote</h1>
      <div className="login-div">
        <h3 style={{'align-self': 'center', 'margin-bottom': '25px'}}>{wantToLogin ? 'User Login' : 'Create New Account'}</h3>
        <form className="login-form" onSubmit={wantToLogin ? handleLogin : handleRegister}>
          <input className="username-bar" placeholder="User Name"
            value={userName}
            onChange={(e) => (setUserName(e.target.value))}
          />
          <input className="email-bar" placeholder="E-mail"
            value={email}
            onChange={(e) => (setEmail(e.target.value))}
          />
          <input className="password-bar" placeholder="Password"
            value={password}
            onChange={(e) => (setPassword(e.target.value))}
          />
          {hasLoginFailed && (
            <p style={{'alignSelf': 'center', 'margin-bottom': '0px'}}>{wantToLogin ? `Invalid UserName or password` : `Enter valid UserName and email`}</p>
          )}
          <button className="login-button"
          >{wantToLogin ? 'Login' : 'Sign Up'}</button>
        </form>

        <div className="other-buttons-div">
          <p>{wantToLogin ? `Not a user?` : `Already a user?`}</p>
          <button className="want-toggle-button"
            onClick={() => {
              setWantToLogin(!wantToLogin)
              setHasLoginFailed(false)
            }}
          >{wantToLogin ? 'Register' : 'Login'}</button>
        </div>
      </div>
    </div>
  );
}

export default Login;