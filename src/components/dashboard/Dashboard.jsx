import React ,{useEffect}from "react";
import "./Dashboard.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {

  const navigate=useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      navigate('/');
    }
  }, [navigate]);


  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate('/')

      })
      .catch((error) => {
        console.log(error)
      });
  };
  return (
    <div className="dasgboard-wrapper">
      <div className="side-nav">
        <div className="profile-info">
          <img src={localStorage.getItem("photoUrl")} />
          <div>
            <p>{localStorage.getItem("cName")}</p>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
        <hr />
        <div className="menu">
          <Link to="/dashboard/home" className="menu-link">
          <i className="fa-solid fa-house"></i> Home
          </Link>
          <Link to="/dashboard/invoices" className="menu-link">
          <i className="fa-solid fa-file-invoice"></i> Invoices
          </Link>
          <Link to="/dashboard/new-invoice" className="menu-link">
          <i className="fa-solid fa-file-circle-plus"></i> New Invoice
          </Link>
          <Link to="/dashboard/setting" className="menu-link">
          <i className="fa-solid fa-gear"></i>Setting
          </Link>
        </div>
      </div>
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
