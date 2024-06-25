import React from "react";
import '../stylos/imagen.css'
const Title = ({titulo}) => {
    return(
        <div className="titulo">
           <h2 className="tituloH2">{titulo}</h2>
        </div>
    )
}

export default Title;