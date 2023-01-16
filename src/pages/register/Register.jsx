
        //await axios.post(`{process.env.REACT_APP_API_URL}/auth/signup`, user);
     import React from "react";
import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
// import CheckBox from './../login/CheckBox';
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, user);
        history.push("/login");
      } catch (err) {
        console.log(err);
        window.location.reload();
      }
    }
  };
  return (
    <div className="login-container">
      <div className="cardlogin">
        <div className="container">
          <form onSubmit={handleClick}>
            <h1>Register</h1>
            <label htmlFor="Username">
              Username
              <input
                type="username"
                minLength="3"
                placeholder="Username"
                autoComplete="off"
                required
                ref={username}
                className="loginInput"
              />
            </label>
            <label htmlFor="email">
              Email Address
              <input
                placeholder="Email"
                required
                ref={email}
                className="loginInput"
                type="email"
                autoComplete="off"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                placeholder="Password"
                required
                ref={password}
                className="loginInput"
                type="password"
                minLength="6"
              />
            </label>
            <label htmlFor="Password Again">
              Password Again
              <input
                placeholder="Password Again"
                required
                ref={passwordAgain}
                className="loginInput"
                type="password"
              />
            </label>
            <button className="loginRegisterButton" type="submit">
              Sign Up
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </button>
            {/* <div><CheckBox/></div> */}
          </form>
        </div>
      </div>
    </div>
  );
}


// const SignUp = props => {
//     const history = useHistory();
//     const [info, setInfo] = useState({
//        username:'',
//         email: '',
//         password: '',
//         passwordAgain: '',
//     });
// //   const username = useRef();
// //   const email = useRef();
// //   const password = useRef();
// //   const passwordAgain = useRef();
//     const [error, setError] = useState('');

//     const onSubmit = e => {
//         e.preventDefault();
//          if(info.password !== info.passwordAgain) setError('Password is not correct')
//       else setError('')
//         fetch('${process.env.REACT_APP_API_URL}/auth/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username:info.username, email: info.email, password: info.password })
//         }).then(res => res.json()).then(data => {
//             if(!data.success) setError(data.message)
//             else
//             window.setTimeout(function() {
//                 history.push('/login');
//             }, 1000);
           
//             window.location.reload(); 
//         });
//     }

//     const onChange = e => {
//         setInfo({
//             ...info,
//             [e.target.name]: e.target.value
//         })
//     }

//     return (
//         <div>
//             <h1 className="text-center">Sign Up</h1>
//             <form className="w-25 mx-auto" onSubmit={onSubmit}>
//                 {error && <div className="alert alert-danger" role="alert">
//                     {error}
//                 </div>}
//                 <input onChange={onChange} type="username" className="form-control" placeholder="Enter username" name="username" required />
//                 <input onChange={onChange} type="email" className="form-control" placeholder="Enter email" name="email" required />
//                 <input onChange={onChange} type="password" name="password" className="form-control mt-2" placeholder="Password" required />
//                 <input onChange={onChange} type="password" name="passwordAgain" className="form-control mt-2" placeholder="Confirm password" required />
//                 <div className="mt-2 d-flex w-50 justify-content-between mx-auto">
//                     <button type="submit" className="btn btn-primary">Sign Up</button>
//                     <Link to="/login">
//                         <button className="btn btn-primary">Sign In</button>
//                     </Link>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default SignUp;