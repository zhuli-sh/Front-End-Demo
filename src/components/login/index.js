import React from "react";
import { useGoogleLogin } from "react-google-login";
import styles from "./index.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies, Cookies } from "react-cookie";

// refresh token
// import { refreshTokenSetup } from "../../utils";

const clientId =
  "678044777066-144gde2c4fthh7vtojoj75oj8rf8krir.apps.googleusercontent.com";

function LoginHooks({ setSignedIn }) {
  const history = useHistory();

  const cookie = new Cookies();

  const onSuccess = async res => {
    console.log("Login Success: currentUser:", res.profileObj);
    let {email, familyName, givenName} = res.profileObj;
    let uni = email.split("@columbia.edu")[0];
    cookie.set("uni", uni);
    cookie.set("first_name", givenName);
    cookie.set("last_name", familyName);
    setSignedIn(true);

    let response = await axios.get(
      `${process.env.REACT_APP_API_HOST}/users/${uni}`
    );
    console.log(response);
    const { data = [] } = response;
    if (!data.length) {
      history.push("/user/update");
    }

    // alert(`Logged in successfully`);
    // refreshTokenSetup(res);
  };

  const onFailure = res => {
    console.log("Login failed: res:", res);
    alert(`Failed to login. `);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true
  });

  return (
    <div onClick={signIn} className={styles.button}>
      <img src="/google.svg" alt="google login" className={styles.icon}></img>

      <span className="buttonText">Login</span>
    </div>
  );
}

export default LoginHooks;
