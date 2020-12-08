import React, { useState } from "react";
import styles from "./index.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Home(props) {
  const [value, setValue] = useState("");
  const history = useHistory();
  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
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
    } catch (err) {
      // alert("Oops, something went wrong. Please try again later.");
    }

  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.h1}>
          <span className={styles.book}>Book</span>
          <span className={styles.delight}>Delight</span>
        </h1>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={styles.input}
            placeholder="search by book title or ISBN"
            data-testid="search-input"
          />
          <div
            className={styles.iconContainer}
            onClick={handleSubmit}
            data-testid="search-button"
          >
            <SearchIcon fontSize="inherit" />
          </div>
        </div>
        <div className={styles.browseLink}>
          or <Link to="/categories">browse by category</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
