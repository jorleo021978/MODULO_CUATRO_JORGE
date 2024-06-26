import React from "react";
import '../assets/styles/component.css'

const Title = (props) =>{
    return(
        <div className="name">
            <h2>{props.title}</h2>
        </div>          
    )
}
export default Title;