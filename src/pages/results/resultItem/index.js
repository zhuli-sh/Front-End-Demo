import React, { useEffect, useState } from "react";

const ListItem = ({ result, key, userUni, createConversation }) => {
  const history = useHistory();
  const { image_url, title, isbn, price, uni, listing_id } = result;
  const handlePlaceOrder = async () => {
    // history.push({
    //   pathname: `/results/${listing_id}/checkout`,
    //   state: result
    // })
    if (!userUni) {
      // alert('You must log in first!');
    } else if (userUni === uni) {
      // alert('Can not buy your own book!');
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
        // alert("Oops, something went wrong. Please try again later");
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

export default ListItem;