import React, { Component } from "react";
import styles from "./index.module.css";

function uploadImage(props) {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={props.imageFile} />
      </div>
      <input
        type="file"
        onChange={props.handleUploadImage}
        className={styles.input}
      />
      <div className={styles.nextButton} onClick={props.handleNextClick}>
        Next
      </div>
    </div>
  );
}

export default uploadImage;
