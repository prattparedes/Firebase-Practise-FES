import React from "react";
import Logo from "../assets/Frontend.png";
import "./Nav.css";

function Nav({ register, login, logout, user, loading }) {
  console.log(user);
  return (
    <nav id="nav">
      <figure>
        <img src={Logo} alt="" className="nav__logo" />
      </figure>
      <div className="nav__btns">
        {loading ? (
          <>
            <div className="btn skeleton__register"></div>
            <div className="btn skeleton__profile"></div>
          </>
        ) : (
          <>
            {!user ? (
          <><button className="btn btn__login" onClick={login}>
          Login
        </button>
        <button className="btn btn__register" onClick={register}>
          Register
        </button></>
        ) : (
          <button className="btn logout" onClick={logout}>
            {user.email[0].toUpperCase()}
          </button>
        )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
