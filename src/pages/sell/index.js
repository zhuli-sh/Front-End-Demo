import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import styles from "./index.module.css";
import UploadImage from "./uploadImage";
import SellForm from "./form";
import Confirm from "./confirmation";
import axios from "axios";
import { Cookies } from "react-cookie";

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      imageAlt: "",
      address: "",
      step: 1,
      postDetails: null
    };
  }

  handleUploadImage = () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'fjl9usgo');
    const options = {
      method: 'POST',
      body: formData,
    };

    return fetch(`https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          imageUrl: res.secure_url,
          imageAlt: `An image of ${res.original_filename}`
        })
      })
      .catch(err => console.log(err));
  }

  handleSubmit = async () => {
    const cookie = new Cookies();
    let data = {
      ...this.state.postDetails,
      listing_id: Math.floor(Math.random() * 10001) + Date.parse(new Date()).toString().slice(1).slice(-5),
      uni: cookie.get('uni'),
      image_url: this.state.imageUrl,
      is_sold: 0
    };
    try {
      let res = await axios.post("http://localhost:5000/posts", data);
      this.props.history.push('/listings');
    } catch (err) {
      alert("Oops, something went wrong. Please try again later.");
    }
    // console.log(res);
  };

  handleEdit = () => {
    this.setState({ step: 2 });
  };

  handleNextClick = () => {
    let {step, postDetails} = this.state;
    if (step === 2) {
      console.log(postDetails);
      if (isNaN(postDetails.isbn) || postDetails.isbn.length !== 13) {
        alert("Please enter a valid ISBN.");
        return;
      } else if (isNaN(postDetails.price)) {
        alert("Please enter a valid price.");
        console.log("should return");
        return;
      }
    }
    this.setState({
      step: step + 1
    });
  };

  storeDetails = details => {
    this.setState({
      postDetails: details
    });
  };

  getTitle = () => {
    let { step } = this.state;
    let title = "";
    if (step === 1) {
      title = "Upload Photo";
    } else if (step === 2) {
      title = "Tell Us More";
    } else if (step === 3) {
      title = "Confirm";
    }
    return title;
  };

  getStep = () => {
    let { step } = this.state;
    if (step === 1) {
      return (
        <UploadImage
          handleUploadImage={this.handleUploadImage}
          handleNextClick={this.handleNextClick}
          imageUrl={this.state.imageUrl}
          imageAlt={this.state.imageAlt}
        />
      );
    } else if (step === 2) {
      return (
        <SellForm
          handleNextClick={this.handleNextClick}
          storeDetails={this.storeDetails}
          postDetails={this.state.postDetails}
        />
      );
    } else if (step === 3) {
      return (
        <Confirm
          postDetails={this.state.postDetails}
          handleSubmit={this.handleSubmit}
          handleEdit={this.handleEdit}
        />
      );
    } else {
      return this.successPage();
    }
  };

  successPage = () => {
    return <div>Posted successfully!</div>;
  };

  render() {
    console.log(this.state.step);
    console.log(this.state.postDetails);
    return (
      <div className={styles.container}>
        <div className={styles.sellContainer}>
          <h2 className={styles.title}>{this.getTitle()}</h2>
          {this.getStep()}
        </div>
      </div>
    );
  }
}

export default withRouter(Sell);
