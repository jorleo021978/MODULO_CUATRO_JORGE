import React from "react";
import '../stylos/imagen.css'

const Imagen = ({src, alt}) => {
    return(
        <>
            <img className="tamanio" src={src} alt={alt} />
        </>
    )
}
export default Imagen;