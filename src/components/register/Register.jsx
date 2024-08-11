import React, { useRef, useState } from "react";
import "../login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const fileInputref = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [address,setAddress]=useState("")
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoader(true)
    // console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((newUser) => {
        // console.log(newUser);
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
        uploadBytesResumable(storageRef, file).then((res) => {
          // console.log(res);
          getDownloadURL(storageRef).then((downloadedUrl) => {
            // console.log(downloadedUrl);
            updateProfile(newUser.user, {
              displayName: displayName,
              photoURL: downloadedUrl,

            });
            setDoc(doc(db, "users", newUser.user.uid), {
              uid: newUser.user.uid,
              email: email, 
              displayName: displayName,
              photoURL: downloadedUrl,
              password: password,
              address:address
            });
            localStorage.setItem("cName", displayName);
            localStorage.setItem("photoUrl", downloadedUrl);
            localStorage.setItem("email", newUser.user.email);
            localStorage.setItem("uid", newUser.user.uid);
            localStorage.setItem("address", newUser.user.address);
            navigate("/dashboard");
            setLoader(false)

          });
        });
      })

      .catch((error) => {
        setLoader(false)
        console.log(error);
      });
  };

  const onSelectFile = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-box login-left"></div>
        <div className="login-box login-right">
          <h2 className="login-heading">Create Your Account</h2>
          <form onSubmit={submitHandler}>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <input
            className="login-input"
            type="text"
            placeholder="Company Name"
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            required
          />
          <input
              className="login-input"
              type="text"
              placeholder="Company Adress"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <input
              style={{ display: "none" }}
              className="login-input"
              type="file"
              ref={fileInputref}
              onChange={(e) => {
                onSelectFile(e);
              }}
            />
            <input
              style={{ display: "none" }}
              className="login-input"
              type="file"
              ref={fileInputref}
              onChange={(e) => {
                onSelectFile(e);
              }}
              required
            />
            <input
              className="login-input"
              type="button"
              value="Select Your Company Logo"
              onClick={() => {
                fileInputref.current.click();
              }}
              required
            />
            {imageUrl != null && (
              <img src={imageUrl} alt="image" className="preview" />
            )}

            <button className="login-input login-butn" type="submit">
             { loader && <i class="fas fa-spinner fa-pulse"></i>}Submit
            </button>
          </form>
          <Link to={"/login"} className="register-link">
            {" "}
            Login With Your Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
