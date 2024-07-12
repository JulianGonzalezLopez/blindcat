import "./Modal.css";
import { useContext, useRef, useState } from "react";
import { TokenContext } from "../App";
import { CreateModalContext } from "../App";

function CreateModal({ }) {
  const ref = useRef();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    nsfw: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

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

    setFormData({
      title: '',
      content: '',
      nsfw: false,
    });

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

  return (
    <>
    <dialog className="modal"
      ref={ref}
      onCancel={closeModal}
    >
      <form onSubmit={handleSubmit} className="modal-form">
        <label htmlFor="title">Titulo</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        <label htmlFor="nsfw">NSFW?</label>
        <input type="checkbox" name="nsfw" id="nsfw" checked={formData.nsfw} onChange={handleChange}/>
        <label htmlFor="content">Contenido</label>
        <textarea name="content" id="content" cols="30" rows="10" value={formData.content} onChange={handleChange} required></textarea>
        <button className="send" type="submit">Enviar</button>
        <button className="close" onClick={closeModal}>Cerrar</button>
      </form>

    </dialog>

    </>
  );
}

export default CreateModal;