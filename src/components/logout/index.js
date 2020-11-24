import React from "react";
import { useGoogleLogout } from "react-google-login";
import { useCookies, Cookies } from "react-cookie";
import styles from "./index.module.css";

const clientId =
  "678044777066-144gde2c4fthh7vtojoj75oj8rf8krir.apps.googleusercontent.com";

function Logout({ setSignedIn }) {
  const cookie = new Cookies();

  const onLogoutSuccess = () => {
    console.log("Logout made successfully");
    cookie.remove("uni");
    setSignedIn(false);
  };

  const onFailure = res => {
    console.log("Login failed: res:", res);
    alert(`Failed to login. `);
  };

  const { signOut } = useGoogleLogout({
    onLogoutSuccess,
    onFailure,
    clientId
  });

  return (
    <div onClick={signOut} className={styles.button}>
      <img src="/google.svg" alt="google login" className={styles.icon}></img>

      <span className="buttonText">Logout</span>
    </div>
  );
}

export default Logout;
