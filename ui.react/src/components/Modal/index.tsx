import React, { useState } from "react"
import { EnhanceProps, ModalProps } from "./types"
import "./style.css"
import { ModalController } from "./controller"

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  if (!props.isModalOpen) {
    return <div onClick={props.openModal}>{props.closedChildren}</div>
  }
  return (
    <>
      <div
        className="modal-overlay"
        onClick={props.handleClick}
      >
        <div
          className="modal-wrapper"
          onClick={() => {}}
        >
          <button onClick={props.closeModal}>Close</button>
          <div className="modal-content">{props.children}</div>
        </div>
      </div>
    </>
  )
}

const Enhance = (props: EnhanceProps): JSX.Element => {
  return (
    <Modal
      {...ModalController()}
      closedChildren={props.closedChildren}
      children={props.children}
    />
  )
}

export default Enhance
