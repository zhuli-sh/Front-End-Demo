import React from "react";
import styles from "./index.module.css";

const Confirm = ({ postDetails }) => {
  const { title, subject, isbn, price, description } = postDetails;
  const details = [
    {
      title: "Book Title",
      value: title
    },
    {
      title: "Subject",
      value: subject
    },
    {
      title: "ISBN",
      value: isbn
    },
    {
      title: "Price",
      value: price
    },
    {
      title: "Description",
      value: description ? description : "None"
    }
  ];
  return (
    <div className={styles.formContainer}>
      <div className={styles.detailsWrapper}>
        {details.map(item => (
          <div className={styles.detail}>
            <div className={styles.detailTitle}>{item.title}</div>
            <div className={styles.detailValue}>{item.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton}>Edit</button>
        <button className={styles.doneButton}>Post</button>
      </div>
    </div>
  );
};

export default Confirm;
