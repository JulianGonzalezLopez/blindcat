import "./Modal.css";
import { useEffect, useRef } from "react";

function Modal({ openModal, closeModal, token, userId, fetchData, setCurrentError, openErrorModal}) {
  const ref = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const requestData = {
      title: formData.get('title'),
      content: formData.get('content'),
      nsfw: formData.get("nsfw"),
      creation_date: date
    };

    try {
      const response = await fetch('http://localhost:3001/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':token
        },
        body: JSON.stringify(requestData)
      });
      
      await fetchData();
      if (response.ok) { 
        console.log("creado"); 
        closeModal();
      } else {
        console.log(response);
        console.error('Error al CREAR POST:');
        let responseJSON = await response.json();
        console.log(responseJSON);
        setCurrentError(responseJSON.error);
        openErrorModal();
        // Aquí puedes manejar el error de registro de alguna manera
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:');
      console.log(error);
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
    <>
    <dialog className="modal"
      ref={ref}
      onCancel={closeModal}
    >

      <form onSubmit={handleSubmit} className="modal-form">
        <label htmlFor="title">Titulo</label>
        <input type="text" id="title" name="title" required />
        <label htmlFor="nsfw">NSFW?</label>
        <input type="checkbox" name="nsfw" id="nsfw" />
        <label htmlFor="content">Contenido</label>
        <textarea name="content" id="content" cols="30" rows="10" required></textarea>
        <button className="send" type="submit">Enviar</button>
        <button className="close" onClick={closeModal}>Cerrar</button>
      </form>

    </dialog>

    </>
  );
}

export default Modal;