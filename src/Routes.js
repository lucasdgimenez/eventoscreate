import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./view/Login";
import Cadastro from "./view/usuario_novo";
import Home from "./view/Home";
import UsuarioRecuperar from "./view/UsuarioRecuperar"
import EventosCadastro from "./view/EventoCadastro";
import EventoDetalhe from "./view/EventoDetalhe";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/eventos/:parametro" component={Home}/>
      <Route exact path="/cadastro">
        <Cadastro />
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/usuariorecuperar">
        <UsuarioRecuperar/>
      </Route>
      <Route exact path="/eventocadastro">
        <EventosCadastro/>
      </Route>
      <Route path="/eventosdetalhes/:id" component={EventoDetalhe}/>
      
    </Switch>
  );
};
