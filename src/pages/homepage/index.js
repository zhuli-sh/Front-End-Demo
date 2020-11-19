import React, { Component } from "react";
import styles from "./index.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link, withRouter } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = () => {
    const { value } = this.state;
    if (
      (value.length === 13 && !value.includes(" ")) ||
      value.split("-").join("").length === 13
    ) {
      this.props.history.push("/results");
      console.log("search by isbn");
    } else {
      this.props.history.push("/results");
      console.log("search by name");
    }
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  render() {
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
              value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              className={styles.input}
              placeholder="search by book title or ISBN"
            />
            <div className={styles.iconContainer} onClick={this.handleSubmit}>
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

export default withRouter(Home);
