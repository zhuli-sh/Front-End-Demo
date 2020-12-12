import React, { useEffect, useReducer } from "react";
import styles from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function SellForm({ handleNextClick, storeDetails, postDetails }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      category: "",
      isbn: "",
      price: "",
      description: ""
    }
  );

  useEffect(() => {
    if (postDetails) {
      let { title, isbn, price, description } = postDetails;
      console.log(postDetails);
      setUserInput({
        title, isbn, price, description
      })
    }
  }, [])

  // let nextButtonDisabled = !(
  //   userInput.title &&
  //   userInput.isbn &&
  //   userInput.price
  // );

  let nextButtonDisabled = false;

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInput({ [name]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <TextField
          required
          id="outlined-required"
          label="Book Title"
          name="title"
          value={userInput.title}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          size="small"
          InputProps={{
            "data-testid": "title-input"
          }}
        />
        <TextField
          required
          id="outlined-password-input"
          label="ISBN"
          name="isbn"
          value={userInput.isbn}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          size="small"
          aria-label="isbn"
          helperText="Enter 13-digit ISBN. ex: 1850204230812"
          InputProps={{
            "data-testid": "isbn-input"
          }}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Price"
          name="price"
          value={userInput.price}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            "data-testid": "price-input"
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Description"
          name="description"
          value={userInput.description}
          onChange={handleChange}
          multiline
          rows={3}
          variant="outlined"
          margin="normal"
          size="small"
        />
      </div>
      <div
        className={styles.nextButton}
        onClick={async () => {
          await storeDetails(userInput);
          handleNextClick();
        }
        }
      >
        Next
      </div>
    </div>
  );
}
