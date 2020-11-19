import React from "react";
import { useGoogleLogin } from "react-google-login";
import styles from "./index.module.css";

// // refresh token
// import { refreshTokenSetup } from "../../utils";

// const clientId =
//   "707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com";

function LoginHooks() {
  // const onSuccess = res => {
  //   console.log("Login Success: currentUser:", res.profileObj);
  //   alert(
  //     `Logged in successfully`
  //   );
  //   refreshTokenSetup(res);
  // };

  // const onFailure = res => {
  //   console.log("Login failed: res:", res);
  //   alert(`Failed to login. `);
  // };

  // const { signIn } = useGoogleLogin({
  //   onSuccess,
  //   onFailure,
  //   clientId,
  //   isSignedIn: true,
  //   accessType: "offline"
  //   // responseType: 'code',
  //   // prompt: 'consent',
  // });

  return (
    <div
      // onClick={signIn}
      className={styles.button}
    >
      <img src="/google.svg" alt="google login" className={styles.icon}></img>

      <span className="buttonText">Login</span>
    </div>
  );
}

export default LoginHooks;
