import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import classes from "./ProfileImage.module.css";

class ProfileImage extends Component {
  selectFileHandler = () => {
    document.getElementById("imageFile").click();
  };

  render() {
    return (
      <div className={classes.ProfileImage}>
        <div
          className={classes.ProfileImageContainer}
          onClick={this.selectFileHandler}
        >
          <div className={classes.ProfileImageOverlay}>
            <span>Change Profile Pic</span>
          </div>
          <div className={classes.Edit}>
            <FontAwesomeIcon icon={faPencilAlt} className={classes.EditIcon} />
          </div>
          {localStorage.getItem("profilePic") && !this.props.profileImg ? (
            <div
              className={classes.ImagePreview}
              id="imagePreview"
              onClick={this.selectFileHandler}
              style={{
                backgroundImage: "url(" + this.props.profilePic + ")"
              }}
            />
          ) : (
            <div
              className={classes.ImagePreview}
              id="imagePreview"
              // onClick={this.selectFileHandler}
              style={!this.props.profilePic ? { background: "#262f3d" } : null}
            >
              <FontAwesomeIcon
                id="profileIcon"
                className={classes.ProfileIcon}
                icon={faUserCircle}
              />
            </div>
          )}

          <input
            type="file"
            id="imageFile"
            val=""
            onChange={event => this.props.selectImage(event)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profilePic: state.profilePic
  };
};

export default connect(
  mapStateToProps,
  null
)(ProfileImage);
