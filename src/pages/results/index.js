import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";

function Results() {
  const location = useLocation();
  // console.log(location.search.split("=")[1]);
  // console.log(location.state);

  // useEffect(() => {
  //   // console.log(location.pathname); // result: '/secondpage'
  //   console.log(location.search); // result: '?query=abc'
  //   console.log(location.state); // result: 'some_value'
  // }, [location]);

  const listItem = (result, key) => {
    const { title, category, isbn, price, uni } = result;
    return (
      <div className={styles.itemContainer} data-testid="result-item" key={key}>
        <div className={styles.left}>
          <div className={styles.imgContainer}></div>
          <div>
            <div className={styles.title}>{title}</div>
            <div className={styles.category}>{category}</div>
            <div className={styles.isbn}>ISBN: {isbn}</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.price}>${price}</div>
          <div className={styles.price}>{uni}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>
        {location.state.length} results for "
        {location.search.split("query=")[1]}"
      </h2>
      <div className={styles.resultContainer}>
        {location.state.map((result, index) => listItem(result, index))}
      </div>
    </div>
  );
}

export default Results;
