import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./index.module.css";
import { useGoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { useCookies, Cookies } from "react-cookie";

const clientId =
  "678044777066-144gde2c4fthh7vtojoj75oj8rf8krir.apps.googleusercontent.com";

export default function SimpleMenu({ setSignedIn, pathName, setUni }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const cookie = new Cookies();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProfileClick = () => {
    handleClose();
    history.push("/user/profile");
  };

  const onListingsClick = () => {
    handleClose();
    history.push("/listings");
  };

  const onOrdersClick = () => {
    handleClose();
    history.push("/orders");
  };

  const onLogoutSuccess = () => {
    console.log("Logout made successfully");
    cookie.remove("uni");
    setUni('');
    setSignedIn(false);
  };

  const onFailure = res => {
    // console.log("Login failed: res:", res);
    // alert(`Failed to login. `);
  };

  const { signOut } = useGoogleLogout({
    onLogoutSuccess,
    onFailure,
    clientId
  });

  const onLogoutClick = () => {
  
    handleClose();
    signOut();
    history.push("/");
  };

  return (
    <div data-testid="profile-menu">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={styles.button}
      >
        Profile
      </Button>
      {/* {pathName==="" && 
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={styles.buttonMobile}
        >
          Profile
        </Button>
      } */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={onProfileClick} data-testid="profile-button">Profile</MenuItem>
        <MenuItem onClick={onOrdersClick} data-testid="order-button">Orders</MenuItem>
        <MenuItem onClick={onListingsClick} data-testid="listing-button">Listings</MenuItem>
        <MenuItem onClick={onLogoutClick} data-testid="logout-button">Logout</MenuItem>
      </Menu>
    </div>
  );
}
