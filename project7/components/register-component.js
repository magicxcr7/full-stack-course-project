import React from "react";

const RegisterComponent = () => {
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" name="username" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input type="text" className="form-control" name="email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">role</label>
          <input type="text" className="form-control" name="role" />
        </div>
        <br />
        <button className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
