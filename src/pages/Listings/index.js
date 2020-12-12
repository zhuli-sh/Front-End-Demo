import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./index.module.css";
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import axios from "axios";
import { Cookies } from 'react-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import QRCode from 'qrcode.react';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ListItem from './listItem';

function Listings() {
  const location = useLocation();
  const history = useHistory();
  const cookie = new Cookies();
  const uni = cookie.get('uni');
  const [loading, setLoading] = useState(false);
  const [code, setQRCode] = useState(false);
  const [listings, setListings] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [, updateState] = React.useState();
  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // console.log(location.search.split("=")[1]);
  // console.log(location.state);

  // useEffect(() => {

  //   const getListings = async () => {

  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_API_HOST}/users/${uni}/listings`);
  //       setListings(response.data);
  //       setLoading(false);
  //       console.log("response", response.data);

  //     } catch (err) {
  //       setLoading(false);
  //       // alert("Oops, something went wrong. Please refresh the page.")
  //     }
  //   }

  //   getListings();

  // }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.h2} data-testid="listing-title" >
        Listings
      </h2>
      <div className={styles.resultContainer}>
        {/* {loading ? <CircularProgress className={styles.spinner} /> : listings.map((result, index) => <ListItem result={result} />)} */}
      </div>
    </div>
  );
}

export default Listings;
