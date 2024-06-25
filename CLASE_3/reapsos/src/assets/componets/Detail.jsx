import React from "react";
import '../stylos/imagen.css'

const Details = ({genero, estatus}) => {
    return(
        <div className="Details">
            <p>Genero: {genero}</p>
            <p>Estado: {estatus}</p>
        </div>
    )
}

export default Details;