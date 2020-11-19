import React, { Component } from "react";
import {useLocation} from 'react-router-dom';
import styles from "./index.module.css";

function Results({ results = [0, 0, 0, 0, 0], query }) {

  const location = useLocation();
  console.log(location.search.split("=")[1]);
  
  const listItem = (result, key) => {
    return (
      <div className={styles.itemContainer} data-testid="result-item" key={key}>
        <div>item</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>{results.length} results for "{location.search.split("=")[1]}"</h2>
      <div className={styles.resultContainer}>
        {results.map((result, index) => listItem(result, index))}
      </div>
    </div>
  );
}

export default Results;
