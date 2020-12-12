import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./index.module.css";
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import axios from "axios";
import { Cookies } from 'react-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Scanner from '../../components/qrScanner';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';


function ListItem({ result }) {
  const [scannerOpen, setScannerOpen] = useState(false);
  const { image_url, description, isbn, price, title, is_sold, listing_id, status, order_id } = result;
  const onCompleteClick = () => {
    setScannerOpen(true);
  }

  const closeScanner = () => {
    setScannerOpen(false);
  }
  const scannerContainer = () => {
    return (
      <div className={styles.scannerContainer}>
        <div className={styles.closeButton} onClick={closeScanner}><CloseOutlinedIcon /></div>
        <Scanner listingId={listing_id} orderId={order_id} setScannerOpen={setScannerOpen} />
      </div>
    )
  }
  return (
    <div className={styles.itemContainer} data-testid="result-item" >
      {scannerOpen ? scannerContainer() : null}
      <div className={styles.imgContainer}>
        <img src={image_url} alt="book" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.left}>
          <div className={styles.title}>{title}</div>
          <div className={styles.isbn}>ISBN: {isbn}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.price}>
            <span >${price}  </span>
            <span className={styles.divider}>|</span> <span>{status}</span>
          </div>
          <div className={styles.pay} onClick={onCompleteClick} >Confirm</div>
        </div>
      </div>
    </div>
  );
}



function Listings() {
  const location = useLocation();
  const history = useHistory();
  const cookie = new Cookies();
  const uni = cookie.get('uni');
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);


  useEffect(() => {

    const getListings = async () => {

      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/users/${uni}/orders`);
        setListings(response.data);
        setLoading(false);
        console.log("response", response.data);

      } catch (err) {
        setLoading(false);
        alert("Oops, somethign went wrong. Please refresh the page.")
      }
    }

    getListings();

  }, []);


  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>
        Orders
      </h2>
      <div className={styles.resultContainer}>
        {loading ? <CircularProgress className={styles.spinner} /> : listings.map((result, index) => <ListItem result={result} />)}
      </div>
    </div>
  );
}

export default Listings;
