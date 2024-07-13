import React from "react";
import '../styles/component.css'

const Image = (props) =>{
    return(
        <div className="boxImg">
           <img src={props.url} alt="Foto"/>
        </div>
    )
}
export default Image;