import "./ErrorModal.css";
import { useEffect, useRef } from "react";

function ErrorModal({ error, openModal, closeModal}) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
        ref.current?.show();
        document.getElementById("error-modal").classList.add("disappear");
        setTimeout(function() {
            document.getElementById("error-modal").classList.remove("disappear");
            ref.current?.close();
            closeModal();
          }, 1000);
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className="error-modal" id="error-modal">
    <p>{error}</p>
    </dialog>
  );
}

export default ErrorModal;