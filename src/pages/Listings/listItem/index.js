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
import QRCode from 'qrcode.react';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const ListItem = ({ result }) => {

  const location = useLocation();
  const history = useHistory();
  const cookie = new Cookies();
  const uni = cookie.get('uni');
  const [code, setQRCode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const { image_url, description, isbn, price, title, is_sold, listing_id, order_id, status } = result;
  const listingMenu = () => {
    console.log("listing menu", listing_id);
    const handleClose = () => {
      setAnchorEl(null);
    };
    const onDeleteClick = async () => {

      if (!status) {
        try {
          await axios.delete(`${process.env.REACT_APP_API_HOST}/posts/${listing_id}`);
          handleClose();
          window.location.reload();
        } catch (err) {
          // alert("Oops, something went wrong. Please refresh the page.")
        }
      } else {
        handleClose();
        // alert("You can not delete a listing in an existing order.")
      }
    }
    const onEditClick = () => {
      history.push({
        pathname: `listings/${listing_id}/edit`,
        state: result
      });
      handleClose();
    }

    const showQRCode = () => {
      setQRCode(true);
      handleClose();
    }

    const onCancelClick = async () => {
      if (status === "In Progress") {
        try {
          await axios.put(`${process.env.REACT_APP_API_HOST}/orders/${order_id}`, { status: "Canceled" });
          await axios.put(`${process.env.REACT_APP_API_HOST}/posts/${listing_id}`, { is_sold: 0 });
          handleClose();
          window.location.reload();
        } catch (err) {
          // alert("Oops, something went wrong. Please refresh the page.")
        }
      } else {
        handleClose();
        // alert("You can only cancel an order in progress.")

      }
    }
    return (
      <div data-testid="profile-menu">
        {code && <div className={styles.codeContainer}>
          <div onClick={() => { setQRCode(false) }} className={styles.closeButton}><CloseOutlinedIcon /></div>
          <QRCode value={listing_id} />
        </div>}
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={styles.button}
        >
          Options
      </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={onEditClick} data-testid="profile-button">Edit</MenuItem>
          <MenuItem onClick={onDeleteClick} data-testid="profile-button">Delete</MenuItem>
          <MenuItem onClick={showQRCode} data-testid="profile-button">Confirm with QR code</MenuItem>
          <MenuItem onClick={onCancelClick} data-testid="profile-button">Cancel Ongoing Order</MenuItem>
        </Menu>
      </div>
    );
  }
  console.log(listing_id);
  return (
    <div className={styles.itemContainer} data-testid="result-item">
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
            <span className={styles.divider}>|</span> {!is_sold ? <span className={styles.active}>Active</span> : <span className={styles.sold}>{status}</span>}
          </div>
          <div>{listingMenu(listing_id, is_sold, result)}</div>

        </div>
      </div>
    </div>
  );
};

export default ListItem