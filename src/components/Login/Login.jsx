import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.scss";

import logo from "../../assets/logo.png";
import { Button } from "../../UI/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../UI/Input/Input";
import { useAuth } from "../../Hooks/useAuth";
import axios from "../../api/axios";

export const Login = (props) => {
  const { setAuth } = useAuth();
  const emailRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [Email, setEmail] = useState("Alexa@agilemanagemnt.co.za");
  const [Pwd, setPwd] = useState("Margincd1!");
  const [ErrMsg, setErrMsg] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);

  const options = {
    method: 'GET',
    url: 'http://localhost/php_rest_agile_management/api/getUser.php',
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L3BocF9yZXN0X2FnaWxlX21hbmFnZW1lbnQvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdC9waHBfcmVzdF9hZ2lsZV9tYW5hZ2VtZW50LyIsImlhdCI6MTY2NzY0Mzk3NywiZXhwIjoxNjY3NjQ3NTc3LCJkYXRhIjp7InVzZXJfaWQiOjZ9fQ.0_jfSXSE00ksTfpXH7ereOJm-R2Odefeyie03adia7k'
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [Email, Pwd]);

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const JwtResponse = await axios.post('/login.php', {
        email: Email, 
        password: Pwd
      })
      setAuth({accessToken: JwtResponse.data.token, login: true})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={loginHandler}>
        <img src={logo} />
        <hr />
        <h1>Welcome to Agile Management </h1>
        {ErrMsg && (
          <p
            ref={errRef}
            className={styles.error_message}
            aria-live="assertive"
          >
            {ErrMsg}
          </p>
        )}
        <Input
          label="Email"
          type="text"
          id="email"
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          required={true}
          valid={true}
        />
        <Input
          label="Password"
          type={ShowPassword ? "text" : "password"}
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={Pwd}
          required={true}
          showHidePasswordHandler={setShowPassword}
          showHidePassword={ShowPassword}
          ShowHide={true}
          valid={true}
        />
        <Link className={styles.register_a} to="/reset">
            Forgot password
          </Link>
        <br />
        <Button>Login</Button>
        <br />
      </form>
    </main>
  );
};
