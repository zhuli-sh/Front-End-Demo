import React, { useReducer } from "react";
import styles from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function SellForm() {
  const cookie = new Cookies();
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: "",
      phone: "",
      country: "United States",
      state: "NY",
      city: "New York",
      address: "",
      zipcode: ""
    }
  );

  let nextButtonDisabled = !(
    userInput.phone &&
    userInput.address &&
    userInput.zipcode
  );

  const handleSubmit = async () => {
    let { username, phone, address, zipcode, country, state, city } = userInput;
    let uni = cookie.get("uni");
    let userData = {
      uni,
      user_name: username,
      email: `${uni}@columbia.edu`,
      phone_number: phone,
      credential: ""
    };
    console.log(userData);
    let userResponse = await axios.post(
      `${process.env.REACT_APP_API_HOST}/users`,
      userData
    );

    let addressData = {
      address_id: Math.floor(Math.random() * 100001),
      uni,
      country,
      state,
      city,
      address,
      zipcode
    };

    let addressResponse = await axios.post(
      `${process.env.REACT_APP_API_HOST}/addresses`,
      addressData
    );

    console.log(userResponse);
    console.log(addressResponse);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInput({ [name]: value });
  };

  return (
    <div className={styles.container}>
      <h4>About You</h4>
      <div className={styles.inputGroup}>
        <TextField
          required
          id="outlined-required"
          label="Username"
          name="username"
          value={userInput.username}
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
          label="Phone Number"
          name="phone"
          value={userInput.phone}
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
          label="State"
          name="state"
          disabled
          value={userInput.state}
          variant="outlined"
          margin="normal"
          size="small"
          InputProps={{
            "data-testid": "title-input"
          }}
        />
        <TextField
          id="outlined-password-input"
          label="City"
          name="city"
          disabled
          value={userInput.city}
          variant="outlined"
          margin="normal"
          size="small"
        />
        <TextField
          required
          id="outlined-required"
          label="address"
          name="address"
          value={userInput.address}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          size="small"
        />
        <TextField
          required
          id="outlined-required"
          label="Zip code"
          name="zipcode"
          value={userInput.zipcode}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          size="small"
        />
      </div>
      <div
        className={
          nextButtonDisabled ? styles.disabledNextButton : styles.nextButton
        }
        onClick={nextButtonDisabled ? null : handleSubmit}
      >
        Submit
      </div>
    </div>
  );
}
