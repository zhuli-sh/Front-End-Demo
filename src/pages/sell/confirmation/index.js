import React from "react";
import styles from "./index.module.css";

const Confirm = ({ postDetails, handleSubmit, handleEdit }) => {
  const { title, isbn, price, description } = postDetails;
  const details = [
    {
      title: "Book Title",
      value: title
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
      value: description
    }
  ];
  return (
    <div className={styles.formContainer}>
      <div className={styles.detailsWrapper}>
        {details.map(item => (
          <div className={styles.detail} key={item.title}>
            <div className={styles.detailTitle}>{item.title}</div>
            <div className={styles.detailValue}>{item.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles.doneButton} onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Confirm;
