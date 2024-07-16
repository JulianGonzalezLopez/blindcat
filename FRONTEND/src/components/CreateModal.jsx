import "./CreateModal.css";
import { useContext, useState, useEffect } from "react";
import { TokenContext } from "../App";
import { CreateModalContext } from "../App";

function CreateModal({setShowCreateModal, categories}) {
  console.log(TokenContext);
  const [token, setToken] = useContext(TokenContext);
  
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
      category: formData.get('category'),
      nsfw: formData.get("nsfw"),
      creation_date: date
    };

    setFormData({
      title: '',
      content: '',
      category: '',
      nsfw: false,
    });

    try {
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':token
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) { 
        console.log("creado"); 
        setFormData({
          title: '',
          content: '',
          category: '',
          nsfw: false,
        });
        setShowCreateModal(false);
      } else {
        console.log(response);
        console.error('Error al CREAR POST:');
        let responseJSON = await response.json();
        console.log(responseJSON);
        
        // Aquí puedes manejar el error de registro de alguna manera
      }
    } catch (error) {
      console.error('Error al conectarse al servidor:');
      console.log(error);
      // Aquí puedes manejar errores de conexión de red
    }
  };

  useEffect(() => {
    const manejarTeclaPresionada = (evento) => {
      if (evento.key === 'Escape') {
        setShowCreateModal(false);
      }
    };

    window.addEventListener('keydown', manejarTeclaPresionada);
    return () => {
      window.removeEventListener('keydown', manejarTeclaPresionada);
    };
  }, []);

  return (
      <form className="create-modal" onSubmit={handleSubmit}>
        <input type="text" id="title" name="title" className="title" value={formData.title} onChange={handleChange} placeholder="Titulo" required />
        <textarea name="content" id="content" className="content" cols="30" rows="10" value={formData.content} onChange={handleChange} placeholder="Contenido" required></textarea>
        
        <select name="category" id="category" className="category">
          {categories.map((category) => (
            <option key={category.key} value={category.value}>
              {category.key}
            </option>
          ))}
        </select>
        <label htmlFor="nsfw">NSFW?</label>
        <input type="checkbox" name="nsfw" id="nsfw" checked={formData.nsfw} onChange={handleChange}/>
        <div className="btns-container">
          <button className="create-modal-btn send" type="submit">Enviar</button>
          <button className="create-modal-btn close" onClick={()=>{setShowCreateModal(false)}}>Cerrar</button>
        </div>
      </form>
  );
}

export default CreateModal;