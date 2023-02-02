import styles from './Modal.module.css'
import {createPortal} from "react-dom";

const Modal = (props) => {
  return (
    <>
      {createPortal(<div onClick={() => props.onClose()} className={styles.backdrop}></div>, document.body)}
      {createPortal(<div className={styles.modal}>{props.children}</div>, document.body )}
    </>
  )
}

export default Modal