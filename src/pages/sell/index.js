import React, { Component } from "react";
import styles from "./index.module.css";
import UploadImage from "./uploadImage";
import SellForm from "./form";
import Confirm from "./confirmation";

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      address: "",
      step: 1,
      postDetails: null
    };
  }

  handleUploadImage = e => {
    this.setState({
      imageFile: URL.createObjectURL(e.target.files[0])
    });
  };

  handleNextClick = () => {
    this.setState({
      step: this.state.step + 1
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
    } else {
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
          imageFile={this.state.imageFile}
        />
      );
    } else if (step === 2) {
      return (
        <SellForm
          handleNextClick={this.handleNextClick}
          storeDetails={this.storeDetails}
        />
      );
    } else {
      return <Confirm postDetails={this.state.postDetails} />;
    }
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

export default Sell;
