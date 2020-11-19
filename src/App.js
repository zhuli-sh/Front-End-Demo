import { useState } from "react";
import styles from "./App.module.css";
import Home from "./pages/homepage";
import Categories from "./pages/categories";
import Sell from "./pages/sell";
import Results from "./pages/results";
import GoogleLogin from "./components/login";
import { Route, useLocation, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

function App() {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState("");
  const pathName = location.pathname.slice(1);
  console.log(location.pathname.slice(1));

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (
      (value.length === 13 && !value.includes(" ")) ||
      value.split("-").join("").length === 13
    ) {
      history.push("/results");
      console.log("search by isbn");
    } else {
      history.push("/results");
      console.log("search by name");
    }
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
                />
                <div
                  className={styles.iconContainer}
                  onClick={handleSubmit}
                  data-testid="searchButton"
                >
                  Go
                </div>
              </div>
            )}
          </div>
        )}
        <div className={styles.buttons}>
          <GoogleLogin />
          <div
            className={styles.lightButton}
            onClick={() => {
              history.push("/sell");
            }}
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
      </div>
    </div>
  );
}

export default App;
