import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./index.module.css";
import axios from 'axios';
import { Cookies } from 'react-cookie';


const ListItem = ({ result, key, userUni, createConversation }) => {
  const history = useHistory();
  const { image_url, title, isbn, price, uni, listing_id } = result;
  const handlePlaceOrder = async () => {
    // history.push({
    //   pathname: `/results/${listing_id}/checkout`,
    //   state: result
    // })
    if (!userUni) {
      alert('You must log in first!');
    } else if (userUni === uni) {
      alert('Can not buy your own book!');
    } else {
      let order_id = Math.floor(Math.random() * 10001) + Date.parse(new Date()).toString().slice(1).slice(-5);
      const data = {
        buyer_confirm: 1,
        buyer_uni: userUni,
        listing_id,
        order_id,
        seller_confirm: 1,
        seller_uni: uni,
        status: 'In Progress',
        transaction_amt: price
      }
      try {
        await axios.post(`${process.env.REACT_APP_API_HOST}/orders`, data);
        history.push('/orders');
      } catch (err) {
        alert("Oops, something went wrong. Please try again later");
      }
    }
  }
  return (
    <div className={styles.itemContainer} data-testid="result-item" key={key}>
      <div className={styles.imgContainer}>
        <img src={image_url} alt="book" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.left}>
          <div className={styles.title}>{title}</div>
          <div className={styles.isbn}>ISBN: {isbn}</div>
          <div className={styles.seller} onClick={
            () => { createConversation(title, uni) }
          }>Contact Seller</div>
        </div>
        <div className={styles.right}>
          <div className={styles.price}>${price}</div>
          <div
            className={styles.lightButton}
            onClick={handlePlaceOrder}
          >
            Buy
        </div>
        </div>
      </div>
    </div>
  );
};

function Results({ createConversation }) {
  const location = useLocation();
  const cookie = new Cookies();
  const [userUni, setUni] = useState('');
  // console.log(location.search.split("=")[1]);
  // console.log(location.state);

  useEffect(() => {
    setUni(cookie.get('uni'));
  }, []);



  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>
        {location.state.length} results for "
        {location.search.split("query=")[1]}"
      </h2>
      <div className={styles.resultContainer}>
        {location.state.map((result, index) => {
          return result.is_sold ? null : <ListItem result={result} key={index} createConversation={createConversation} userUni={userUni} />;
        })}
      </div>
    </div>
  );
}

export default Results;
