import "./ErrorModal.css";
import { useState, useEffect } from "react";

function ErrorModal({message, setError}){
    const [visible, setVisible] = useState(true);
    const [fade, setFade] = useState(false);
  
    useEffect(() => {
      // Agregar la clase fade-out inmediatamente
      setFade(true);
  
      // Después de 5 segundos, ocultar el popup y realizar acciones adicionales
      const timer = setTimeout(() => {
        setFade(false);
        setVisible(false);
        setError("");
      }, 5000); // 5 segundos
  
      // Limpieza del temporizador cuando el componente se desmonte
      return () => clearTimeout(timer);
    }, [message]);
  
    return (
      <>
        {visible && (
          <div className={`disappearing-div error-container ${fade ? "fade-out" : ""}`}>
            <p className="error-text">{message}</p>
          </div>
        )}
      </>
    );
  };


export default ErrorModal;