/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "./App.module.css";
import Home from "./pages/homepage";
import Categories from "./pages/categories";
import Sell from "./pages/sell";
import Results from "./pages/results";
import GoogleLogin from "./components/login";
import GoogleLogout from "./components/logout";
import { Route, useLocation, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Signup from "./pages/userInfoForm";
import Profile from "./pages/profile";
import UserMenu from "./components/userMenu";
import axios from "axios";
import { Cookies } from "react-cookie";

function App() {
  const cookie = new Cookies();
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const pathName = location.pathname.slice(1);
  console.log(location.pathname.slice(1));

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    let response;
    if (
      (value.length === 13 && !value.includes(" ")) ||
      value.split("-").join("").length === 13
    ) {
      response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/books?isbn=${value}`
      );

      console.log(response);
    } else {
      response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/books?title=${value}`
      );
    }
    history.push({
      pathname: `/results`,
      search: `?query=${value}`,
      state: response.data
    });
    // history.push("/results");
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.App}>
      <div className={pathName !== "" ? styles.header : styles.header_home}>
        {pathName !== "" && (
          <div className={styles.headerInputContainer}>
            <div
              className={styles.homeButton}
              data-testid="header-home-button"
              onClick={() => {
                history.push("/");
              }}
            >
              <span className={styles.book}>Book</span>
              <span className={styles.delight}>Delight</span>
            </div>
            {pathName !== "sell" && (
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  value={value}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className={styles.input}
                  placeholder="search by book title or ISBN"
                  data-testid="header-search-input"
                />
                <div
                  className={styles.iconContainer}
                  onClick={handleSubmit}
                  data-testid="header-search-button"
                >
                  <SearchIcon fontSize="inherit" />
                </div>
              </div>
            )}
          </div>
        )}
        <div className={styles.buttons}>
          {cookie.get('uni') ? (
            <UserMenu setSignedIn={setSignedIn} />
          ) : (
              <GoogleLogin setSignedIn={setSignedIn} />
            )}
          <div
            className={styles.lightButton}
            onClick={
              cookie.get('uni')
                ? () => {
                  history.push("/sell");
                }
                : () => {
                  // alert("You must log in first!");
                }
            }
          >
            Sell
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <Route exact path="/" component={Home} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/sell" component={Sell} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/user/update" component={Signup} />
        <Route exact path="/user/profile" component={Profile} />
      </div>
    </div>
  );
}

export default App;
