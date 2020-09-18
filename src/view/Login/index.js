import React, {useState} from 'react';
import "./login.css"
import firebase from "../../config/firebase"
import 'firebase/auth'
import {Link, Redirect} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
/*useSelector para selecionar o estado lá da nossa store
o dispatch para enviar solicitações*/

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msgTipo, setMsgTipo] = useState("")

  const dispatch = useDispatch();

  const Logar = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(r => {
      setMsgTipo("Sucesso")
      setTimeout(() => {
        dispatch({type: 'LOG_IN', usuarioEmail: email})
      }, 2000);
    }).catch(err => {
      setMsgTipo("Erro")
    })
    
  }

  return (
    <div className="login-content">
      {
        useSelector(state => state.usuarioLogado) > 0 ? <Redirect to="/"/> : null
      }
      <form className=" mx-auto form-login text-center">
        <i class="far fa-smile-wink text-white fa-5x"></i>
        <h1 className="text-white font-weight-bold mb-3 text-center">Login</h1>
        
        <input onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control my-2 col-md-12" id="inputEmail" placeholder="Email" aria-describedby="emailHelp"/>
        <input onChange={(e)=>{setPassword(e.target.value)}}type="password" className="form-control my-2 col-md-12" placeholder="Senha" id="inputPassword"/>
        <button onClick={Logar} type="button" className="btn btn-lg btn-block btn-light mt-3 mb-5">Entrar</button>

        <div className="msg-login text-white text-center my-5">
        {msgTipo === 'Sucesso' && <span>Você está conectado! &#128526;</span>} 
          
        {msgTipo === 'Erro' && <span><strong>Ops!</strong> Verifique se a senha ou úsuario estão corretos! &#128546;</span>}
      </div>
      
      <div className="opcoes-login mt-5 text-center">
        <Link to="/usuariorecuperar" className="mx-2">Recuperar senha</Link>
        <span className="text-white">&#9050;</span>
        <Link to="/cadastro" className="mx-2">Quero fazer um cadastro</Link>
      </div>
      
    </form>
  </div>
  )
}

export default Login;