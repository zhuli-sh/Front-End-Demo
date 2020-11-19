import React, { Component } from "react";
import styles from "./index.module.css";

function Results({ results = [0, 0, 0, 0, 0], query }) {
  const listItem = result => {
    return (
      <div className={styles.itemContainer}>
        <div>item</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>{results.length} results</h2>
      <div className={styles.resultContainer}>
        {results.map(result => listItem(result))}
      </div>
    </div>
  );
}

export default Results;
