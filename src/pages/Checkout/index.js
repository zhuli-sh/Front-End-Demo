import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./index.module.css";
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
// import DropIn from "braintree-web-drop-in-react";

const Checkout = () => {
  const location = useLocation();
  const history = useHistory();
  const [instance, setInstance] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/checkouts/new`);
      const clientToken = await response.json(); // If returned as JSON string
  
      setToken(clientToken.client_token);
      console.log(clientToken);
    }

    getToken();
  }, [])

  const buy = async () => {
    const { nonce } = await instance.requestPaymentMethod();
    await fetch(`${process.env.REACT_APP_API_HOST}/purchase/${nonce}`);
  }
  return (
    <div className={styles.container}>
        <h2>Checkout</h2>
        {/* <DropIn
          options={{ authorization: '123' }}
          onInstance={(clientInstance) => (setInstance(clientInstance))}
        /> */}
        <button className={styles.button} onClick={buy}>Buy</button>
    </div>
  );
};

export default Checkout;