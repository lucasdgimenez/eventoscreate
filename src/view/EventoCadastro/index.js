/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import "./eventocadastro.css"
import {useSelector} from "react-redux"
import firebase from "../../config/firebase"
import {Link, Redirect} from "react-router-dom"
import NavBar from "../../components/NavBar"

function EventosCadastro() {
  const [carregando, setCarregando] = useState("")
  const [msgTipo, setMsgTipo] = useState("")
  const [titulo, setTitulo] = useState("")
  const [tipo, setTipo] = useState("")
  const [detalhes, setDetalhes] = useState("")
  const [data, setData] = useState("")
  const [hora, setHora] = useState("")
  const [foto, setFoto] = useState("")
  const usuarioEmail = useSelector(state => state.usuarioEmail)

  const storage = firebase.storage();
  const db = firebase.firestore();

  

  function cadastrarEvento() {
    setMsgTipo(null)
    setCarregando(1)
    storage.ref(`imagens/${foto.name}`).put(foto).then(()=> {
      db.collection('eventos').add({
        titulo: titulo,
        tipo: tipo,
        detalhes: detalhes,
        data: data,
        hora: hora,
        usuario: usuarioEmail,
        visualizacoes: 0,
        foto: foto.name,
        publico: 1,
        criacao: new Date()
      }).then(()=> {
        setMsgTipo("Sucesso")
        setCarregando(0)
      }).catch(err => {
        setMsgTipo("Erro")
        setCarregando(0)
      })
    })
  }


  return (
    <>
    <NavBar/>
    <div className="col-12 mt-5">
      <div className="row">
        <h1 className="mx-auto font-weight-bold">Novo evento</h1>
      </div>
      <form>

        <div className="form-group">
          <label>Titulo: </label>
          <input onChange={(e)=>{setTitulo(e.target.value)}} type="text" className="form-control"/>
        </div>

        <div className="form-group">
          <select onChange={(e)=>{setTipo(e.target.value)}} className="form-control">
              <option disabled selected value>Selecione um tipo</option>
              <option>Corporativo</option>
              <option>Esportes</option>
              <option>Festa</option>
              <option>Musica</option>
          </select>
        </div>

        <div className="form-group">
          <label>Descrição do Evento: </label>
          <textarea onChange={(e)=>{setDetalhes(e.target.value)}} className="form-control" rows="3"/>
        </div>

        <div className="form-group row">
          <div className="col-6"> 
            <label>Data </label>
            <input onChange={(e)=>{setData(e.target.value)}} type="date" className="form-control"/>
          </div>

          <div className="col-6"> 
            <label>Hora </label>
            <input onChange={(e)=>{setHora(e.target.value)}} type="time" className="form-control"/>
          </div>

        </div>

        <div className="form-group">
          <label>Upload da foto</label>
          <input onChange={(e)=>{setFoto(e.target.files[0])}} type="file" className="form-control"/>
        </div>
        
        <div className="row">
          { carregando > 0 ?
            <div className="spinner-border text-black mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          :
          <button onClick={cadastrarEvento} type="button" className="btn btn-lg btn-block btn-primary mt-3 mb-5 btn-public">Publicar evento</button>
          }
          
        </div>
        
      </form>
      <div className="msg-login text-center my-5">
        {msgTipo === 'Sucesso' && <span>Evento publicado! &#128526;</span>} 
          
        {msgTipo === 'Erro' && <span><strong>Ops!</strong> Não foi possivel publicar o evento! &#128546;</span>}
      </div>
    </div>
    </>
  )
}

export default EventosCadastro