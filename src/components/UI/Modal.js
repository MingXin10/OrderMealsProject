import classes from './Modal.module.css'
import ReactDOM from 'react-dom'

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCloseCart}></div>
}

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlays')

const Modal = (props) => {
  return (
    <>
      {/* <Backdrop />
      <ModalOverlay>{props.children}</ModalOverlay> 改用下面的portal*/}
      {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
      {/* 上一行也要放 {props.children}，客製的ModalOverlay裡面的{props.children}才能用*/}
    </>
  )
}

export default Modal
