// Modal as a separate component
import { useEffect, useRef } from "react";

function Modal({ openModal, closeModal, children, token, userId }) {
  const ref = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const requestData = {
      title: formData.get('title'),
      content: formData.get('content'),
      user_id: userId
    };

    console.log(requestData);
    console.log(userId);
    console.log(token);

    try {
      const response = await fetch('http://localhost:3001/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':token
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        console.log("CERATEEEE");
        closeModal();
      } else {
        console.error('Error al CREAR POST:');
        // Aquí puedes manejar el error de registro de alguna manera
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:');
      // Aquí puedes manejar errores de conexión de red
    }
  };



  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
    >

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
        <button className="login-button" type="submit">Send</button>
      </form>

      <button onClick={closeModal}>
        Close
      </button>
    </dialog>
  );
}

export default Modal;