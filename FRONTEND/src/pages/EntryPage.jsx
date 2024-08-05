import Entry from "../components/Entry";
import CommentsSection from "../components/CommentsSection";
import { useContext, useEffect } from "react";
import back_arrow from "../assets/back_arrow.svg";
//asd
import "./EntryPage.css";
//asd
import { useNavigate } from "react-router-dom";
function EntryPage(){
    const navigate = useNavigate();
    let post_id = localStorage.getItem("post_id");
    return(
        <div className="entry_page_container">
            <img className="back_arrow" src={back_arrow} alt="back_arrow" onClick={()=>{ localStorage.removeItem("post_id"); navigate("/app");}}/>
            <div className="entry_page">
                <Entry post_id={post_id}></Entry>
                <CommentsSection post_id={post_id}></CommentsSection>
            </div>
        </div>
    );

}


export default EntryPage;