import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import {Provider} from 'react-redux';

import Suscriptores from './componentes/suscriptores/Suscriptores';
import NuevoSuscriptor from './componentes/suscriptores/NuevoSuscriptor';
import EditarSuscriptor from './componentes/suscriptores/EditarSuscriptor';
import MostrarSuscriptor from './componentes/suscriptores/MostrarSuscriptor';
import Navbar from './componentes/layoud/Navbar';
import Libros from './componentes/libros/Libros';
import MostrarLibro from './componentes/libros/MostrarLibro';
import NuevoLibro from './componentes/libros/NuevoLibro';
import EditarLibro from './componentes/libros/EditarLibro';
import PrestamoLibro from './componentes/libros/PrestamoLibro';
import Login from './componentes/auth/Login';

import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth';


function App() {
  return (
    <Provider store={store}>
      <Router>      
        <Navbar />
          <div className="container">
            <Switch>
              
              <Route exact path="/" component={UserIsAuthenticated(Libros)}></Route>
              <Route exact path="/libros/mostrar/:id" component={UserIsAuthenticated(MostrarLibro)}></Route>
              <Route exact path="/libros/nuevo" component={UserIsAuthenticated(NuevoLibro)}></Route>
              <Route exact path="/libros/editar/:id" component={UserIsAuthenticated(EditarLibro)}></Route>
              <Route exact path="/libros/prestamo/:id" component={UserIsAuthenticated(PrestamoLibro)}></Route>

              <Route exact path="/suscriptores" component={UserIsAuthenticated(Suscriptores)}></Route>
              <Route exact path="/suscriptores/nuevo" component={UserIsAuthenticated(NuevoSuscriptor)}></Route>
              <Route exact path="/suscriptores/mostrar/:id" component={UserIsAuthenticated(MostrarSuscriptor)}></Route>
              <Route exact path="/suscriptores/editar/:id" component={UserIsAuthenticated(EditarSuscriptor)}></Route>
              
              <Route exact path="/login" component={UserIsNotAuthenticated(Login)}></Route>

            </Switch>
          </div>      
      </Router>    
    </Provider>
  );
}

export default App;
