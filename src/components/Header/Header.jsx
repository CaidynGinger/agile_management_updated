import React from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { UserProfile } from "./UI/UserProfile";
import { useAuth } from "../../Hooks/useAuth";

export const Header = () => {

  const { Auth } = useAuth();
  console.log(Auth);

  return (
    <header className={styles.header}>
      <nav>
        <img src={logo} />
        <Link to="/patients">Patients</Link>
        <Link to="/receptionists">Receptionists</Link>
        <Link to="/doctors">Doctors</Link>
        <a>
          <UserProfile user={Auth.user}/>
        </a>
      </nav>
      {/* <div className={styles.user_settings_gradient}></div> */}
      {/* <div className={styles.user_settings}>
        <img/>
        <h2>User settings</h2>
        <br/>
        <h3>{Auth.user.name}</h3>
      </div> */}
    </header>
  );
};
