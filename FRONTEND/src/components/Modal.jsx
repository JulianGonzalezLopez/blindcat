import "./Modal.css";
import { useEffect, useRef } from "react";

function Modal({ openModal, closeModal, token, userId, fetchData}) {
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
      console.log("!!!!!!!!!!");
      await fetchData();
      console.log("!!!!!!!!!!");
      if (response.ok) { 
        console.log("creado");
        
      } else {
        console.error('Error al CREAR POST:');
        // Aquí puedes manejar el error de registro de alguna manera
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:');
      // Aquí puedes manejar errores de conexión de red
    }
    console.log("NO LLEGA ACÁ");
    
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

      <form onSubmit={handleSubmit} className="modal-form">
        <label htmlFor="title">Titulo</label>
        <input type="text" id="title" name="title" required />
        <label htmlFor="nsfw">NSFW?</label>
        <input type="checkbox" name="nsfw" id="nsfw" />
        <label htmlFor="content">Contenido</label>
        <textarea name="content" id="content" cols="30" rows="10"></textarea>
        <button className="send" type="submit" onClick={closeModal}>Enviar</button>
      </form>

      <button className="close" onClick={closeModal}>
        Cerrar
      </button>
    </dialog>
  );
}

export default Modal;