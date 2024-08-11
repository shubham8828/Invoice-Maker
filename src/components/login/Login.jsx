import React ,{ useState} from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const [loader, setLoader] = useState(false);


  const submitHandler=((e)=>{
    e.preventDefault();
    setLoader(true)
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredencial)=>{
      const user=userCredencial.user
        // console.log(user)
        localStorage.setItem('cName',user.displayName)
        localStorage.setItem('photoUrl',user.photoURL)
        localStorage.setItem('email',user.email)
        localStorage.setItem('uid',user.uid)


        navigate('/dashboard')
        setLoader(false)
    })
    .catch((error)=>{
      setLoader(false)
      console.log(error)

    //   const errorcode=error.code;
    // const errorMessage=error.errormessage;
    })

  })

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-box login-left"></div>
        <div className="login-box login-right">
          <h2 className="login-heading">Login</h2>
          <form onSubmit={submitHandler}>
            <input className="login-input" type="email" placeholder="Email" 
              onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              onChange={(e)=>{setPassword(e.target.value)}}
              required
            />
            <button className="login-input login-butn" type="submit" >
              
            { loader && <i class="fas fa-spinner fa-pulse"></i>}Submit</button>
          </form>
          <Link to={"/register"} className="register-link">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
