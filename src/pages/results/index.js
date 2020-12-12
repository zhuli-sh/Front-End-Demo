import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styles from "./index.module.css";
import axios from 'axios';
import { Cookies } from 'react-cookie';
import ListItem from './resultItem';


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
        {/* {location.state.map((result, index) => {
          return <ListItem result={result} key={index} createConversation={createConversation} userUni={userUni} />;
        })} */}
      </div>
    </div>
  );
}

export default Results;
