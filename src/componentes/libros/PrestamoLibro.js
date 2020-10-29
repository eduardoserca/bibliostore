import React, { Component } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Spinner from '../layoud/spinner';
import PropTypes from 'prop-types';
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';

import {buscarUsuario} from './../../actions/buscarUsuarioActions';

class PrestamoLibro extends Component {
    
    state = {  
        noResultado: false,
        busqueda:''
    }

    leerDato = e => {        
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    buscarAlumno = e =>{
        e.preventDefault();
        
        const {busqueda} =this.state;        
        const {firestore, buscarUsuario} =this.props;

        const coleccion = firestore.collection('suscriptores');
        const consulta = coleccion.where("codigo", "==", busqueda).get();

        consulta.then(resultado => {
            if(resultado.empty){
                //almacenar en redux un objeto vacio
                buscarUsuario({});

                //No hay resultado                
                this.setState({
                    noResultado: true
                });
            }else{
                //Si hay resultado
                const datos = resultado.docs[0];
                //colocar resultado en redux
                buscarUsuario(datos.data());
                this.setState({                    
                    noResultado: false
                });
            }
        });
    }

    //almacena los datos  del alumno para  solicitar el libro
    solicitarPrestamo = () => {
        const {usuario} = this.props;
        
        //fecha de alta
        usuario.fecha_solicitud = new Date().toLocaleDateString();

        //No se pueden mutar los props, tomar una copia crear un arreglo nuevo
        let prestados = [];
        prestados = [...this.props.libro.prestados, usuario];

        //copiar el objeto y agregar los prestados
        const libro = {...this.props.libro};

        //Eliminar los prestados anteriores
        delete libro.prestados;

        //asiganar los prestados
        libro.prestados = prestados;

        const {firestore, history} = this.props;

        //Almacenando en la BD
        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, libro).then(history.push('/'));

    }


    render() {

        const {libro} = this.props;

        if(!libro) return <Spinner />

        //Extraer los datos del alumno
        const {usuario} = this.props;

        let fichaAlumno, btnSolicitar;
        if(usuario.nombre){
            fichaAlumno = <FichaSuscriptor alumno={usuario}
                            />
            btnSolicitar = <button 
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={this.solicitarPrestamo}>Solicitar prestamo</button>                                
        }else{
            fichaAlumno = null;
            btnSolicitar = null;
        }

        //Mostrar mensaje de error
        const {noResultado} = this.state;
        let mensajeResultado = '';
        if(noResultado){
            mensajeResultado = <div className="alert alert-danger text-center font-weight-bold">No hay resultados para ese código.</div>
        }else{
            mensajeResultado = null;
        }
        

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i>{' '}
                        Solicitar prestamo: {libro.titulo}
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5 mb-3">
                            <form
                                onSubmit={this.buscarAlumno}
                                className="mb-4"
                            >
                                <legend className="color-primary text-center">
                                    Buscar el suscriptor por código
                                </legend>

                                <div className="form-group">
                                    <input 
                                        type="text"
                                        name="busqueda"
                                        className="form-control"
                                        onChange={this.leerDato}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Buscar alumno"
                                />

                            </form>
                            
                            {/** Muestra la ficha de alumno y el boton  para solicitar el prestamo **/}
                            {fichaAlumno}
                            {btnSolicitar}

                            {/**Muestra mensaje de no resultado **/}
                            {mensajeResultado}
                        </div>                        
                    </div>
                </div>
            </div>
        );
    }
}

PrestamoLibro.propTypes = {
    firestore: PropTypes.object.isRequired    
}

export default compose(
    firestoreConnect(props => [
        {
            collection: 'libros',
            storeAs:'libro',
            doc: props.match.params.id
        }
    ]),
    connect(({firestore:{ordered}, usuario}, props) => ({
        libro: ordered.libro && ordered.libro[0],
        usuario: usuario

    }),{buscarUsuario})
)(PrestamoLibro);