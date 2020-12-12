import React, { useReducer, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "./index.module.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";
import { Cookies } from "react-cookie";
import AddressInput from '../../components/addressSearch';

export default function SellForm() {
  const cookie = new Cookies();
  const history = useHistory();
  const location = useLocation();
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: "",
      phone: "",
      country: "United States",
      state: "",
      city: "",
      address: "",
      zipcode: "",
      firstRender: true
    }
  );

  useEffect(() => {

    if (userInput.firstRender && location.state) {
      console.log(location.state);
      let { user_name, phone_number, address, state, city, zipcode } = location.state
      setUserInput({
        username: user_name,
        phone: phone_number,
        address: address + ', ' + city + ', ' + state + ' ' + zipcode + ', USA',
        firstRender: false
      })
    }


    if (userInput.address.split(', ').length === 4) {
      const [, city, state_zip,] = userInput.address.split(', ');
      const [state, zipcode] = state_zip.split(' ');
      setUserInput({ state, city, zipcode });
    } else {
      setUserInput({ state: "", city: "", zipcode: "" });
    }

  }, [userInput.address])

  let nextButtonDisabled = !(
    userInput.phone &&
    userInput.address &&
    userInput.zipcode &&
    userInput.state &&
    userInput.city
  );

  const handleSubmit = async () => {
    let { username, phone, address, zipcode, country, state, city } = userInput;
    let uni = cookie.get("uni");
    let first_name = cookie.get("first_name");
    let last_name = cookie.get("last_name");
    let userData = {
      uni,
      first_name,
      last_name,
      user_name: username,
      email: `${uni}@columbia.edu`,
      phone_number: phone,
      credential: ""
    };

    let addressData = {
      address_id: Math.floor(Math.random() * 10001) + Date.parse(new Date()).toString().slice(1).slice(-5),
      uni,
      country,
      state,
      city,
      address: address.split(', ')[0],
      zipcode
    };

    try {
      let userResponse, addressResponse;
      if (location.state) {
        userResponse = await axios.put(
          `${process.env.REACT_APP_API_HOST}/users/${cookie.get('uni')}`,
          userData
        );

        let addresses = await axios.get(`${process.env.REACT_APP_API_HOST}/users/${cookie.get('uni')}/addresses`)
        let addressId = addresses.data[0].address_id;
        addressResponse = await axios.put(
          `${process.env.REACT_APP_API_HOST}/addresses/${addressId}`,
          addressData
        );
      } else {
        userResponse = await axios.post(
          `${process.env.REACT_APP_API_HOST}/users`,
          userData
        );
        addressResponse = await axios.post(
          `${process.env.REACT_APP_API_HOST}/addresses`,
          addressData
        );
      }

      history.push('/user/profile');
    } catch (err) {
      alert("Oops, something went wrong. Please try again later.")
    }


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
        <AddressInput address={userInput.address} setUserInput={setUserInput} />
        <TextField
          required
          id="outlined-required"
          label="State"
          name="state"
          value={userInput.state}
          onChange={handleChange}
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
          value={userInput.city}
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
