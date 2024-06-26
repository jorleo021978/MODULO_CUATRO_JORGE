import React from "react";
import '../App.css'

const Image = (props) =>{
    return(
        <>
           <img className="imgRicky" src={props.url} alt="Foto"/>
        </>
    )
}
export default Image;
