// @ts-nocheck

import React from "react"
import Popup from "reactjs-popup"
import { Link } from "react-router-dom"
import "./style.css"

const Modal = props => (
  <Popup
    trigger={<div className="div">{props.textSmall}</div>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <div
          className="close"
          onClick={close}
        >
          &times;
        </div>
        <div className="smallText">
          {/* <div className="header w-full px-10 py-5">
        Modal Title
      </div> */}
          {props.text()}
        </div>

        <div className="actions ">
          {/* <Popup trigger={<div className="div"> Trigger </div>} position="top center" nested>
          <span>
            EXTRA TEXT
          </span>
        </Popup> */}
          <div
            className="div"
            onClick={() => {
              close()
            }}
          >
            Close
          </div>
        </div>
      </div>
    )}
  </Popup>
)

export default Modal
