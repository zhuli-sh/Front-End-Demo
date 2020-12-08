import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const cookie = new Cookies();
  const uni = cookie.get("uni");
  const history = useHistory();
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   async function getProfile() {
  //     let userResponse = await axios.get(
  //       `${process.env.REACT_APP_API_HOST}/users/${uni}`
  //     );
  //     let addressResponse = await axios.get(
  //       `${process.env.REACT_APP_API_HOST}/users/${uni}/addresses`
  //     );

      
  //     let { email, phone_number, user_name } = userResponse.data[0];
  //     let { state, city, address, zipcode } = addressResponse.data[0];
  //     console.log(userResponse, addressResponse);
  //     setUser({
  //       email,
  //       phone_number,
  //       user_name,
  //       state,
  //       city,
  //       address,
  //       zipcode
  //     });
  //   }
  //   getProfile();
  // }, [uni]);

  const handleClick = () => {
    history.push("/user/update");
  };

  const {
    email,
    phone_number,
    user_name,
    state,
    city,
    address,
    zipcode
  } = user;
  const details = [
    {
      title: "User Name",
      value: user_name
    },
    {
      title: "Email",
      value: email
    },
    {
      title: "Phone Number",
      value: phone_number
    },
    {
      title: "City",
      value: city + ", " + state
    },
    {
      title: "Address",
      value: address + ", " + zipcode
    }
  ];
  return (
    <div className={styles.formContainer}>
      <h4>User Profile</h4>
      <div className={styles.detailsWrapper}>
        {details.map(item => (
          <div className={styles.detail} key={item.title}>
            <div className={styles.detailTitle}>{item.title}</div>
            <div className={styles.detailValue}>{item.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={handleClick} data-testid="profile-edit">
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
