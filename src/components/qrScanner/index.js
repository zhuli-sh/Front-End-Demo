import React, { useState } from 'react'
import QrReader from 'react-qr-reader'
import { Route, useLocation, useHistory } from "react-router-dom";
import axios from 'axios';

function Test({ listingId, orderId, setScannerOpen }) {
  const history = useHistory();

  const handleScan = async (data) => {
    console.log(orderId);
    if (data === listingId) {


      try {
        await axios.put(`${process.env.REACT_APP_API_HOST}/orders/${orderId}`, { status: "Completed" });
        await axios.put(`${process.env.REACT_APP_API_HOST}/posts/${listingId}`, { is_sold: 1 });
        setScannerOpen(false);
        window.location.reload();
        alert('Order completed!');
      } catch (err) {
        alert("oops, something went wrong. Please try again later");
      }
    }
  }
  const handleError = err => {
    console.error(err)
  }

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  )

}

export default Test;