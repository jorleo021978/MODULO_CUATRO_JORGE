import React from "react";
import '../App.css'

const Details = (props) =>{
    return(
        <>
            <div className="details">
                <p>
                    <b>Genero:</b> {props.genre}</p>
                <p>
                    <b>Status:</b>{props.status}
                </p>
            </div>
        </>
    )
}
export default Details;
