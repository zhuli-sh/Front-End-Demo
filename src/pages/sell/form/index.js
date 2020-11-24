import React, { useReducer } from "react";
import styles from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function SellForm({ handleNextClick, storeDetails }) {
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

  let nextButtonDisabled = !(
    userInput.title &&
    userInput.category &&
    userInput.isbn &&
    userInput.price
  );

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
          value={userInput.name}
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
          id="outlined-required"
          label="Subject"
          name="category"
          value={userInput.category}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          size="small"
          InputProps={{
            "data-testid": "subject-input"
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
        className={
          nextButtonDisabled ? styles.disabledNextButton : styles.nextButton
        }
        onClick={
          nextButtonDisabled
            ? null
            : () => {
                storeDetails(userInput);
                handleNextClick();
              }
        }
      >
        Next
      </div>
    </div>
  );
}
