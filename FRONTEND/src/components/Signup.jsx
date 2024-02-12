import "./FormLoginSignup.css";
import { useState } from "react";

function Signup({username, setUsername, logged, setLogged}) {

  const [formData, setFormData] = useState({
    // Inicializa tus campos de formulario si es necesario
    newUsername: '',
    newPassword: '',
    reNewPassword: ''
});

// Función para manejar el cambio en los campos de formulario
const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

const handleSubmit = async (event) => {
  event.preventDefault();

  if (newPassword !== reNewPassword) {
      console.log(newPassword);
      console.log(reNewPassword);
      alert("The passwords are not the same")
      return;
  }

  try {
      const response = await fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              newUsername,
              newPassword,
              reNewPassword
          })
      });

      console.log(response);

      if (!response.ok) {
          throw new Error('Hubo un problema al registrar el usuario');
      }

      // Si la solicitud fue exitosa, puedes hacer algo aquí, como redirigir al usuario a otra página o mostrar un mensaje de éxito
      console.log('Usuario registrado exitosamente');
  } catch (error) {
      console.error('Error al enviar datos:', error.message);
      // Puedes manejar el error de acuerdo a tus necesidades, por ejemplo, mostrando un mensaje de error al usuario
  }
}

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newUsername">Username</label>
        <input type="text" id="newUsername" name="newUsername" value={formData.newUsername}  onChange={handleChange} required />
        <label htmlFor="newPassword">Password</label>
        <input type="password" id="newPassword" name="newPassword" value={formData.newPassword}  onChange={handleChange} required />
        <label htmlFor="newPassword">Repeat password</label>
        <input type="password" id="reNewPassword" name="reNewPassword" value={formData.reNewPassword}  onChange={handleChange} required />
        <button type="submit" className="login-button">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
