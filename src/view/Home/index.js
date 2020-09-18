/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react"
import "./home.css"
import {Link} from "react-router-dom"
import NavBar from "../../components/NavBar"
import {useSelector} from "react-redux"
import firebase from "../../config/firebase"
import EventoCard from "../../components/EventoCard"

function Home({match}) {

  const [eventos, setEventos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  let listaeventos = [];
  const usuarioEmail = useSelector(state => state.usuarioEmail)

  useEffect(()=> {
      if(match.params.parametro) {
        firebase.firestore().collection("eventos").where('usuario','==',usuarioEmail).get()
        .then(async (r) => {
        await r.docs.forEach( doc => {
          if(doc.data().titulo.indexOf(pesquisa) >= 0) {
            listaeventos.push({
              id: doc.id,
              ...doc.data()
            })
          }
        })
        setEventos(listaeventos)
    })
      } else {
        firebase.firestore().collection("eventos").get()
        .then(async (r) => {
        await r.docs.forEach( doc => {
          if(doc.data().titulo.indexOf(pesquisa) >= 0) {
            listaeventos.push({
              id: doc.id,
              ...doc.data()
            })
          }
        })
        setEventos(listaeventos)
    })
    }
    
  })

  return (
    <>
      <NavBar/>
      <h1>{useSelector(state => state.usuarioEmail)}</h1>
      
      <div className="row p-5">
        <h3 className="mx-auto p-5">Eventos Publicados</h3>
        <input onChange={(e)=>setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar evento"/>
      </div>

      <div className="row mt-3 p-3">
        {eventos.map(item => 
          <EventoCard 
            key={item.id}
            id={item.id}
            img={item.foto}
            titulo={item.titulo}  
            detalhes={item.detalhes} 
            visualizacoes={item.visualizacoes}/>)
        }
      </div>
    </>
    
  )
}

export default Home;