import React, { Component } from "react";
import styles from "./index.module.css";

function uploadImage({handleUploadImage, imageUrl, imageAlt, handleNextClick}) {
  console.log("imageurl", imageUrl);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={imageUrl} alt={imageAlt} />
      </div>
      <input
        type="file"
        onChange={handleUploadImage}
        className={styles.input}
      />
      <div className={styles.nextButton} onClick={handleNextClick}>
        Next
      </div>
    </div>
  );
}

export default uploadImage;
