export default async function fetchAuthorization(setToken) {
    let tk = localStorage.getItem("token");
    if (tk != null) {
      try {
        const response = await fetch('http://localhost:3001/authorize/check', {
          headers: new Headers({
            "Authorization": tk
          })
        });
        if (!response.ok) {
            localStorage.removeItem("token");
            return false;
        }
        else{
            console.log("Logged");
            setToken(tk);
            localStorage.setItem("token",tk);
            return true;
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        return false;
      }
    }
    else{
        return false;
    }
  };