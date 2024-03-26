import "./ErrorModal.css";
import { useEffect, useRef } from "react";

function ErrorModal({ error, openModal, closeModal}) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.show();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className="error-modal">
    <p>{error}</p>
    <button onClick={closeModal}>Cerrar</button>
    </dialog>
  );
}

export default ErrorModal;