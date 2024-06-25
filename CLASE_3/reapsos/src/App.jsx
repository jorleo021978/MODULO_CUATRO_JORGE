import { useState, useEffect } from "react"
import './App.css';
import CharacterCard from "./assets/componets/CharacterCard";
import miGato from './assets/img/miGato.jpeg'
import perro from './assets/img/perro.png'
import caballo from './assets/img/caballo.png'
import conejo from './assets/img/conejo.png'

function App(){
  
    return(

    <>
       <div className="container">
        <CharacterCard titulo="Gato Angora" imagen={miGato} genero="Masculino" estatus="Activo"/>
        <CharacterCard titulo="Conejo Silbestre" imagen={conejo} genero="Femenino" estatus="Inactivo"/>
        <CharacterCard titulo="Corcel Negro" imagen={caballo} genero="Masculino" estatus="Activo"/>
        <CharacterCard titulo="Perro de Caza " imagen={perro} genero="Femenino" estatus="Inactivo"/>
      </div>
    </>
  )
}

export default App
