import React, { useRef } from "react";
import { useState } from "react";
import { auth,db, storage } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";

const Setting = () => {
  // const [email, setEmail] = useState(localStorage.getItem('email'));
  // const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState(localStorage.getItem('cName'));
  const [imageUrl, setImageUrl] = useState(localStorage.getItem("photoUrl"));
  const fileInputRef = useRef(null);

  const onSelectFile = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    // console.log(imageUrl)
  };

  const updateLogo = () => {
    const fileRef=ref(storage,localStorage.getItem('photoUrl'))
    // console.log(fileRef._location.path_)
    const storageRef=ref(storage,fileRef._location.path_)
    uploadBytesResumable(storageRef,file)
    .then((res)=>{
      window.location.reload();
    })

    
  };

  const updateCompanyName=()=>{
    updateProfile(auth.currentUser,{
      displayName:displayName
    })
    .then(res=>{
      localStorage.setItem('cName',displayName)
      updateDoc(doc(db,'users',localStorage.getItem('uid')),{
        displayName:displayName
      })
      .then(res=>{
        window.location.reload()

      })
    })
  }
  return (
    <div>
      <p>Setting</p>
      <div className="setting-wrapper">
        <div className="profile-info update-cName">
          <img
            src={imageUrl}
            alt="profile"
            onClick={() => {
              fileInputRef.current.click();
            }}
          />
          <input
            type="file"
            onChange={(e) => {
              onSelectFile(e);
            }}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {file && <button onClick={updateLogo} style={{width:'30%',padding:'10px'}}>Update Profile Image</button>}
        </div>
        <div className="update-cName">
          <input  onChange={(e)=>{setDisplayName(e.target.value)}}type="text" placeholder="Company Name" value={displayName} />
          <button onClick={updateCompanyName} >Update Company Name</button>
          {/* <input  onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Company Name" value={email} /> */}
        </div>
      </div>
    </div>
  );
};

export default Setting;
