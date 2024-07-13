import React from "react";

const Details = (props) =>{
    return(
        <div className="detailsBox">
          <p>
            <b className="details" >Genero:</b> {props.genre}
          </p>
          <p>
            <b className="details" >Status:</b> {props.status}
          </p>
        </div>
    )
}
export default Details;