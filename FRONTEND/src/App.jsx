//STYLE IMPORTS
import './App.css';
//REACT IMPORTS
import { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
//COMPONENTS PAGES IMPORTS
import LoginPage from './pages/LoginPage';
import EntriesPage from './pages/EntriesPage';
import EntryPage from './pages/EntryPage';
import ErrorModal from './components/ErrorModal';
//COMPONENTS IMPORTS
import CreateModal from './components/CreateModal';
//CONTEXT EXPORTS
export const EntryContext = createContext();
export const TokenContext = createContext();
export const CreateModalContext = createContext();
//HELPERS IMPORTS
import fetchAuthorization from './helpers/fetchAuthorization';

  function App() {
    const [token, setToken] = useState("");    
    const [username,setUsername] = useState(""); //REVISAR IMPORTANCIA
    const [error, setError] = useState("");
    const [currentEntry,setCurrentEntry] = useState({title:"", content:"", id:0, username:""});
    const [currentComments, setCurrentComments] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(true);

    //Constantes nuevas
    const navegate = useNavigate();
    
    useEffect(()=>{
      console.log(token);
      async function auxFunction(){
          let res = await fetchAuthorization(setToken);
          console.log(token);
          if(res == true){
            console.log(localStorage.getItem("post_id"))
            if(!localStorage.getItem("post_id")){
              navegate("/app");
            }
            else{
              navegate("/entry");
            }
          }
          else{
            navegate("/login");
          }
      }

      auxFunction();
    },[]);


    useEffect(()=>{
      console.log(token);
      async function auxFunction(){
          let res = await fetchAuthorization(setToken);
          console.log(token);
          if(res == true){
            console.log(localStorage.getItem("post_id"))
            if(!localStorage.getItem("post_id")){
              navegate("/app");
            }
            else{
              navegate("/entry");
            }
          }
          else{
            navegate("/login");
          }
      }

      auxFunction();
    },[token]);

    useEffect(()=>{
      console.log(currentEntry);
      console.log("!!");
      navegate("/entry");
    },[currentEntry]);

    //QUE HICE DIOS
    useEffect(()=>{
      if(error == ""){//asdf

      }
    }, [error]);

    return (
      <div className='app'>
        <TokenContext.Provider value={[token,setToken]}>
          <CreateModalContext.Provider value={[showCreateModal,setShowCreateModal]}>
            <EntryContext.Provider value={[currentEntry, setCurrentEntry, currentComments, setCurrentComments]}> 
              <Routes>
                <Route path="/login" element={<LoginPage  setUsername={setUsername} setError={setError} />}/>
                <Route path="/app" element={<EntriesPage username={username} setUsername={setUsername}/>}/>
                <Route path="/entry" element={<EntryPage></EntryPage>}></Route>
              </Routes>
            </EntryContext.Provider>
          </CreateModalContext.Provider>
        </TokenContext.Provider>
        {/* {showCreateModal && <CreateModal></CreateModal>} */}
        {error && <ErrorModal message={error} type="error" setError={setError}></ErrorModal>}
      </div>
    )
}

export default App
