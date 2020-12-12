import React, { useEffect, useReducer } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from 'axios'

export default function EditForm() {
  const location = useLocation();
  const history = useHistory();
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
    if (location.state) {
      console.log(location.state);
      let { title, isbn, price, description } = location.state;
      setUserInput({
        title, isbn, price, description
      })
    }
  }, [])

  let nextButtonDisabled = !(
    userInput.title &&
    userInput.isbn &&
    userInput.price
  );

  const handleSubmit = async () => {
    try {
      let response = await axios.put(
        `${process.env.REACT_APP_API_HOST}/posts/${location.state.listing_id}`, userInput
      );
      history.push('/listings');
    } catch (err) {
      alert("oops, something went wrong. Please try again later");
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInput({ [name]: value });
  };

  return (
    <div className={styles.container}>
      <h2>Edit Listing</h2>
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
        className={
          nextButtonDisabled ? styles.disabledNextButton : styles.nextButton
        }
        onClick={
          nextButtonDisabled
            ? null
            : handleSubmit
        }
      >
        Update
      </div>
    </div>
  );
}
