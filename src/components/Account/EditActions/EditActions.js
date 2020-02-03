import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import classes from "./EditActions.module.css";

const EditActions = props => {
  const displayEl = useRef(null);
  const inputEl = useRef(null);
  const editEl = useRef(null);
  const confirmEl = useRef(null);
  const cancelEl = useRef(null);

  const showInputHandler = () => {
    displayEl.current.style.display = "none";
    inputEl.current.type = "text";

    inputEl.current.style.borderBottom = "1px solid #ccc";

    inputEl.current.focus();
    editEl.current.style.display = "none";
    confirmEl.current.style.display = "block";
    cancelEl.current.style.display = "block";
  };

  const cancelInput = () => {
    displayEl.current.style.display = "block";
    inputEl.current.type = "hidden";

    inputEl.current.style.borderBottom = "none";

    editEl.current.style.display = "block";
    confirmEl.current.style.display = "none";
    cancelEl.current.style.display = "none";
  };

  const confirmInput = () => {
    displayEl.current.style.display = "block";
    displayEl.current.innerHTML = inputEl.current.value;

    inputEl.current.type = "hidden";
    inputEl.current.style.borderBottom = "none";
    editEl.current.style.display = "block";
    confirmEl.current.style.display = "none";
    cancelEl.current.style.display = "none";
  };

  return (
    <div className={classes.EditActions}>
      <div ref={displayEl} className={classes.DisplayEl}>
        {props.initialVal}
      </div>
      <input
        ref={inputEl}
        type="hidden"
        className={classes.ClearInput}
        id={props.type}
        spellcheck="false"
        // onChange={event => this.inputChangeHandler(event)}
        onChange={event => props.onInputChange(event)}
      />

      <div className={classes.ActionButtons}>
        <div
          ref={editEl}
          className={classes.Edit}
          id="edit"
          // onClick={event => showInputHandler(event, props.inputType)}
          onClick={showInputHandler}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faPencilAlt} className={classes.EditIcon} />
        </div>
        <div
          ref={confirmEl}
          id="confirm"
          className={classes.Confirm}
          onClick={confirmInput}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faCheck} className={classes.EditIcon} />
        </div>
        <div
          ref={cancelEl}
          id="cancel"
          className={classes.Cancel}
          onClick={cancelInput}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faBan} className={classes.EditIcon} />
        </div>
      </div>
    </div>
  );
};

export default EditActions;


