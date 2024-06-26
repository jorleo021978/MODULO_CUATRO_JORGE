import React from "react";
import Title from "./Title";
import Image from "./Image";
import Details from "./Details";

const CharacterCard = (props) =>{
    return(
        <>
         <div>
            <Title title={props.name}/>
            <Image url={props.image}/>
            <Details
            genre={props.genre}
            status={props.status}
            />
         </div>
        </>
    )
}

export default CharacterCard;