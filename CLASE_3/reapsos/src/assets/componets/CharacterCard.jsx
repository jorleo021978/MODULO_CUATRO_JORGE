import '../stylos/imagen.css';
import Details from './Detail';
import Title from './Title';
import Imagen from "./Image";


const CharacterCard = ({titulo, imagen, genero, estatus}) =>{

    return(
        <div>
            <div className="imagenes">
                <Title titulo={titulo}/>
                <Imagen src={imagen} alt={titulo}/>
                {/*<img src={props.imagen} alt={props.alt}/>*/}
                <Details genero={genero} estatus={estatus}/>
            </div>
        </div>
    )
}

export default CharacterCard;