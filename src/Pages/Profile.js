import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref ,onValue } from "firebase/database";
import { db } from "../index";
import profile from "./profile.webp"

function Profile() {
  const auth = getAuth();

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const signingOut = () => {
    auth.signOut().then((response) => {
      console.log("signed out");
      navigate("/");
    });
  };

  useEffect(() => {
    const query = ref(db, "users");
    return onValue(query, (snap) => {
      const data = snap.val();
      if (snap.exists()) {
        Object.values(data).map((user) => {
          if (user.email.toLowerCase() === auth.currentUser.email) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setMobile(user.mobile);
          }
        });
      }
    });
  });

  const cardCss = {
    width: "500px", 
    marginTop: "60px", 
    height: "349px", 
    marginBottom:"60px", 
    background: "black", 
    padding: "20px",
    fontFamily: 'Georgia',
    fontSize: "15px"
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-4"></div>
        <div class="card col-4" style={cardCss}>
          <img src={profile} class="card-img-top center" alt="..."  style={{width: "120px", height: "120px", marginLeft:"180px"}}/>
          <div class="card-body" style={{textAlign: "center"}}>
            <p class="card-text text-info">First Name : {firstName}</p>
            <p class="card-text text-info">Last Name : {lastName}</p>
            <p class="card-text text-info">Email : {email}</p>
            <p class="card-text text-info">Mobile : {mobile}</p>
            <button type="button" class="btn btn-info" onClick={signingOut}>Sign Out</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;