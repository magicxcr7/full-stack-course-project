import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const ProfileComponent = (props) => {
  // 原本在這頁做，移到app.js 在最外面判斷
  //   let [currentUser, setCurrentUser] = useState(null);
  //   useEffect(() => {
  //     setCurrentUser(AuthService.getCurrentUser());
  //   }, []); // immediately load user, 第二個參數有變化就執行

  let { currentUser, setCurrentUser } = props;

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>You must login first before getting your profile. </div>
      )}
      {currentUser && (
        <div>
          <h1>In profile page.</h1>
          <header className="jumbotron">
            <h3>
              {/* currentUser include: success, jwt, user */}
              <strong>{currentUser.user.username}</strong>
            </h3>
            <p>
              <strong>Token: {currentUser.token}</strong>
            </p>
            <p>
              <strong>ID: {currentUser.user._id}</strong>
            </p>
            <p>
              <strong>email: {currentUser.user.email}</strong>
            </p>
          </header>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
