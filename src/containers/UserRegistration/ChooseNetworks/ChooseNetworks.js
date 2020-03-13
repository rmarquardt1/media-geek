import React, { useState, useEffect } from "react";
import Network from "./Network/Network";
import networks from "../../../references/networks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import classes from "./ChooseNetworks.module.css";
import networkClasses from "../ChooseNetworks/Network/Network.module.css";

const ChooseNetworks = props => {
  const [selectedNetworks, setselectedNetworks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  let networksRef = React.createRef();
  let editRef = React.createRef();
  let confirmRef = React.createRef();

  useEffect(() => {
    if (props.page === "account") {
      setselectedNetworks(
        JSON.parse(localStorage.getItem("userData")).favNetworks
      );
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/registration") {
      const networks = networksRef.current.querySelectorAll(
        "[itemType='network']"
      );
      for (let i = 0; i < networks.length; i++) {
        networks[i].classList.add(networkClasses.NetworkHover);
      }
    }
  }, []);

  useEffect(() => {
    if (props.reload) {
      reloadNetworksHandler();
      props.reloaded();
    }
  });

  const reloadNetworksHandler = () => {
    const favFalse = networksRef.current.querySelectorAll(
      "div[favorite=false]"
    );
    const favTrue = networksRef.current.querySelectorAll("div[favorite=true]");
    for (let i = 0; i < favFalse.length; i++) {
      favFalse[i].style.display = "none";
      favFalse[i].classList.remove(networkClasses.NetworkHover);
    }
    for (let i = 0; i < favTrue.length; i++) {
      favTrue[i].style.border = "0px solid rgba(0,0,0,0.5)";
      favTrue[i].style.transition = "none";
      favTrue[i].classList.remove(networkClasses.NetworkHover);
    }
    editRef.current.style.display = "block";
    confirmRef.current.style.display = "none";
    setShowAll(false);
  };

  const showHideNetworksHandler = event => {
    const favNetworks = networksRef.current.querySelectorAll(
      "div[favorite=true]"
    );
    const networks = networksRef.current.querySelectorAll(
      "div[favorite=false]"
    );
    Object.keys(favNetworks).map(k => {
      favNetworks[k].style.border = "3px solid #1a8cff";
    });
    if (event.currentTarget.id === "edit") {
      editRef.current.style.display = "none";
      confirmRef.current.style.display = "block";
    }
    if (event.currentTarget.id === "confirm") {
      editRef.current.style.display = "block";
      confirmRef.current.style.display = "none";
    }
    if (!showAll) {
      Object.keys(favNetworks).map(k => {
        favNetworks[k].classList.add(networkClasses.NetworkHover);
      });
      for (let i = 0; i < networks.length; i++) {
        networks[i].style.display = "flex";
        networks[i].classList.add(networkClasses.NetworkHover);
      }
      setShowAll(!showAll);
    } else {
      for (let i = 0; i < networks.length; i++) {
        networks[i].style.display = "none";
        Object.keys(favNetworks).map(k => {
          favNetworks[k].style.border = "0px solid rgba(0,0,0,0.5)";
          favNetworks[k].style.transition = "none";
          favNetworks[k].classList.remove(networkClasses.NetworkHover);
        });
      }
      setShowAll(!showAll);
    }
  };

  const networkClickHandler = id => {
    let newNetworks = null;
    const networksCopy = [...selectedNetworks];
    const exists = networksCopy.some(el => {
      return el === id;
    });
    if (exists) {
      newNetworks = networksCopy.filter(genreId => genreId !== id);
    } else {
      newNetworks = selectedNetworks.concat(id);
    }
    setselectedNetworks(newNetworks);
  };

  const networkEls = networks.map(n => {
    return (
      <Network
        key={n.id}
        name={n.name}
        id={n.id}
        showAll={showAll}
        click={
          props.page === "account" && showAll
            ? () => props.updateNetworks(n.id)
            : networkClickHandler
        }
        page={props.page}
        favorite={
          props.page === "account"
            ? JSON.parse(localStorage.getItem("userData")).favNetworks.includes(
                n.id
              )
              ? true
              : false
            : false
        }
      />
    );
  });

  return (
    <div
      className={classes.ChooseNetworks}
      style={
        props.page === "account"
          ? {
              paddingLeft: 0,
              paddingTop: 0,
              height: "initial",
              justifyContent: "flex-start",
              marginBottom: "30px"
            }
          : null
      }
    >
      <div
        className={classes.InnerContainer}
        style={
          props.page === "account"
            ? {
                alignItems: "flex-start"
              }
            : null
        }
      >
        {props.page === "account" ? (
          <div style={{ display: "flex", width: "100%" }}>
            <h1
              style={
                props.page === "account"
                  ? {
                      fontSize: "24px",
                      fontWeight: "normal",
                      marginBottom: "10px"
                    }
                  : null
              }
            >
              Favorite Networks
            </h1>
            {props.page === "account" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexGrow: "1"
                }}
              >
                <div
                  onClick={event => showHideNetworksHandler(event)}
                  className={classes.Edit}
                  id="edit"
                  ref={editRef}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </div>
                <div
                  onClick={event => showHideNetworksHandler(event)}
                  className={classes.Confirm}
                  id="confirm"
                  ref={confirmRef}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <h1>Choose your favorite networks</h1>
        )}
        <div
          ref={networksRef}
          className={classes.ChooseNetworksList}
          style={
            props.page === "account"
              ? {
                  justifyContent: "flex-start"
                }
              : null
          }
        >
          {networkEls}
        </div>

        {props.page !== "account" ? (
          <button
            className={classes.ButtonRed}
            onClick={
              props.clickNext
                ? props.clickNext.bind(networks, selectedNetworks)
                : null
            }
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ChooseNetworks;
