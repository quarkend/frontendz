import React  from "react";
import "./topbar.css";
import { AuthContext } from "./../../App";
import { BrowserRouter, useHistory, useParams } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MenuBurger from "../menuBurger/MenuBurger";
import { useState,useContext } from "react";
import { useEffect } from "react";

export default function Topbar(props) {
  const url = "public/images/";
  const [error, setError] = useState(null);
  //eslint-disable-next-line
  const [isLoaded, setIsLoaded] = useState(false);
  let history = useHistory();
  const { state } = React.useContext(AuthContext);
  const storage = JSON.parse(localStorage.getItem("user"));
  const token = "Bearer " + JSON.parse(localStorage.getItem("token"));
  //eslint-disable-next-line
  const [data, setData] = useState("");
 // eslint-disable-next-line
  const { user } = useContext(AuthContext);
  let id = useParams();
  // const  isAdmin = storage.isAmin;
  async function getUserData() {
    const URL = `${"${process.env.REACT_APP_API_URL}/users/"}${id}`;
    const data = await fetch(URL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const response = await data.json();
    setData(response);
    console.log(response);
    setIsLoaded(true);
    setError(error);
  }
  useEffect(() => {
    getUserData();
  }, []);
  // const [userEmail, setUserEmail] = useState('');
  // const logout = e => {
  //     e.preventDefault();
  //     fetch('/api/users/logout', {
  //         method: 'POST'
  //     }).then(res => props.history.push('/login'));
  // }
//   useEffect(() => {
//     fetch('/api/users/getInfo').then(res => res.json()).then(data => {
//         if (data.success) {
//             setUserEmail(data.email)
//         } else {
//             props.history.push('/login')
//         }
//     })
// }, [])
  return (
    <BrowserRouter>
      <nav>
      {/* <a className="navbar-brand" href="#">{userEmail}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/home" className="nav-item nav-link">Home</Link>
                    <Link to="/new" className="nav-item nav-link">Create Book</Link>
                    <span onClick={logout} role="button" className="nav-item nav-link">Logout</span>
                </div>
            </div>  */}
        {state.isAuthenticated && (
          <div>
            <div className="topbarContainer">
              <div className="topbarLeft">
                <h1>G</h1>
                <img
                  className="topbarIco"
                  src="/assets/icon/icon-left-font-monochrome-black.png"
                  alt="icon"
                  onClick={() => {
                    history.push("/");
                  }}
                />
                <div className="searchbar"></div>
              </div>
              <div className="topbarCenter"></div>{" "}
              <div className="topbarIcons">
                <div className="topbarIcon">
                  <HomeIcon
                    onClick={() => {
                      history.push("/");
                    }}
                  />
                </div>
                 <div className="topbarIconItem">
                  <SupervisorAccountIcon
                    onClick={() => {
                      history.push("/admin/" + storage.id);
                    }}
                  />
                </div> 
                <div className="topbarIconItem"></div>
              </div>{" "}
              <div className="topbarIcons">
                 <div className="topbarIconItem">
                  <img
                    src={
                      state.user.profilePicture
                        ? url + state.user.profilePicture
                        : "/assets/person/noAvatar.png"
                    }
                    alt=""
                    className="topbarImg"
                    onClick={() => {
                      history.push("/profile/" + state.user.id);
                    }}
                  />
                  <span className="topbarLinks">{state.user.username} </span> 
              </div>
              <div className="topbarIconItem">
                <MenuBurger />
              </div>
            </div>
          </div>
          </div>
        )}
      </nav>
    </BrowserRouter>
  );
}
