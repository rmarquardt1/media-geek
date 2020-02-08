import React from "react";

import classes from "./AccountSaveResponse.module.css";
import uiClasses from "../../UI/Layout/Layout.module.css";

const AccountSaveResponse = props => {
  return (
    <div className={classes.Response}>
      <div className={classes.ResponseMessage}>
        {props.error ? <h2>Error</h2> : null}
        <p>{props.message}</p>
        <button
          type="button"
          className={uiClasses.ButtonBlue}
          onClick={props.click}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default AccountSaveResponse;
