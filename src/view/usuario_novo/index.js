import React, {useState} from 'react';
import "./usuario_novo.css"
import firebase from "../../config/firebase"
import 'firebase/auth'
import {Link} from "react-router-dom"
import NavBar from "../../components/NavBar";

const NovoUsuario = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [msgTipo, setMsgTipo] = useState()
  const [msg, setMsg] = useState()
  const [carregando, setCarregando] = useState()
  
  const cadastro = () => {
    setMsgTipo(null);
    setCarregando(true)
    if(!email || !password) {
      setMsgTipo('Erro')
      setMsg('Voce precisa informar o email e senha para fazer o cadstro')
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( r=> {
      setCarregando(0)
      setMsgTipo("Sucesso")
    }).catch(err => {
      setCarregando(0)
      setMsgTipo("Erro")
      switch(err.message) {
        case 'The email address is already in use by another account.':
          setMsg('Este email já está sendo utilizado por outro usuario');
          break;
        case 'Password should be at least 6 characters':
          console.log(err.message)
          setMsg('A senha deve ter pelo menos 6 caracteres')
          break;
        case 'The email address is badly formatted.':
          setMsg('O formato do seu email é invalido')
          break;
        default:
          setMsg("Não foi possível cadastrar, tente mais tarde!");
          break;
      }
        })
  }

  return (
    <>
    <NavBar/>
    <div className="form_cadastro">
      <form className="mx-auto form-login text-center">
      <h1 className="text-black font-weight-bold mt-5 mb-3 text-center">Cadastro</h1>
      <input onChange={(e)=>{setEmail(e.target.value)}}  type="email" className="form-control my-2 col-md-12" id="inputEmail" placeholder="Email" aria-describedby="emailHelp"/>
      <input onChange={(e)=>{setPassword(e.target.value)}}  type="password" className="form-control my-2 col-md-12" id="inputPassword" placeholder="Senha"/>

      {
        carregando ? <div className="spinner-border text-black" role="status">
        <span className="sr-only">Loading...</span>
      </div> : <button onClick={cadastro} type="button" className="btn btn-lg btn-block btn-primary mt-3 mb-5">Cadastro</button>
      }

      
      <div className="msg-login text-black text-center my-5">
        {msgTipo === 'Sucesso' && <span> Usuario cadastrado com sucesso! &#128526; </span>
          
        } 
          
        {msgTipo === 'Erro' && <span><strong>Ops!</strong> {msg} &#128546;</span>}
      </div>
      
      <div className="msg-login text-black text-center my-5">
        <Link to="/login" className="mx-2">Quero fazer um login</Link>
        {/*<Link to="/" className="mx-2">Quero fazer um login</Link>*/}

      </div>
      </form>
       
      
    </div>
    </>
  )
}

export default NovoUsuario;