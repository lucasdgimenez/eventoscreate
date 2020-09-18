import React, {useState} from 'react';
import "./UsuarioRecuperar.css"
import firebase from "../../config/firebase"
import 'firebase/auth'
import NavBar from "../../components/NavBar";


function UsuarioRecuperar() {
  const [email, setEmail] = useState();
  const [msg, setMsg] = useState()

  function recuperarSenha() {
    firebase.auth().sendPasswordResetEmail(email).then(r => {
      setMsg("Enviamos um link no seu email, verifique")
    }).catch(err => {
      setMsg("Verifique se o email está correto")
    })
  }
  return (
    <>
      <NavBar/>
        <form className="text-center form-login mx-auto mt-5">
          <h3 className="mb-3 font-weight-bold">Recover</h3>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"/>
          <div className="msg my-4 text-center">
            <span className="">{msg}</span>
          </div>
          <button onClick={recuperarSenha} type="button" className="btn btn-lg btn-block btn-enviar">Recuperar senha</button>
        </form>
    </>
  )
}  

export default UsuarioRecuperar;