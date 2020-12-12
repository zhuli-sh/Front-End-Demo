import React, { useEffect, useState } from "react";

function ListItem({ result }) {
  const [scannerOpen, setScannerOpen] = useState(false);
  const { image_url, description, isbn, price, title, is_sold, listing_id, status, order_id } = result;
  // const onCompleteClick = () => {
  //   setScannerOpen(true);
  // }

  // const closeScanner = () => {
  //   setScannerOpen(false);
  // }
  // const scannerContainer = () => {
  //   return (
  //     <div className={styles.scannerContainer}>
  //       <div className={styles.closeButton} onClick={closeScanner}><CloseOutlinedIcon /></div>
  //       <Scanner listingId={listing_id} orderId={order_id} setScannerOpen={setScannerOpen} />
  //     </div>
  //   )
  // }
  return (
    <div className={styles.itemContainer} data-testid="result-item" >
      {/* {scannerOpen ? scannerContainer() : null} */}
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

export default ListItem;