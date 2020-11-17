import React, { Component } from "react";
import styles from "./index.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.h1}>BookDelight</h1>
          <div className={styles.inputContainer}>
            <input className={styles.input} />
            <div className={styles.iconContainer}>
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
}

export default index;
