import { useEffect } from "react"
import { useContext } from "react";
import { TokenContext } from "../App";
import retrieveAllUserInteractions from "../helpers/retrieveAllUserInteractions";







export default function UserPage(){
    const [token] = useContext(TokenContext);


    useEffect(()=>{
        async function auxFunction(){
            let res = await retrieveAllUserInteractions(token, "asd");
            console.log(res);
        }

        auxFunction();
    },[]);


    return(
        <p>Hola</p>
    )
}