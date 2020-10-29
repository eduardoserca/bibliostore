import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevoLibro extends Component {
    
    state = {  
        titulo:'',
        ISBN: '',
        editorial:'',
        existencia:''
    }

    leerDato = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    agregarLibro = e =>{
        e.preventDefault();

        const nuevoLibro = {...this.state};
        nuevoLibro.prestados = [];

        const {firestore, history} = this.props;

         firestore.add({collection:'libros'}, nuevoLibro).then(()=>history.push('/'));         
    }

    render() {
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
                        Nuevo libro
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.agregarLibro}
                                >
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input                                         
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo  o nombre del libro"
                                        required
                                        value={this.state.titulo}
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input                                         
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        placeholder="Editorial del libro"
                                        required
                                        value={this.state.editorial}
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input                                         
                                        type="text"
                                        className="form-control"
                                        name="ISBN"
                                        placeholder="ISBN de libro"
                                        required
                                        value={this.state.ISBN}
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input                                         
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Cantidad en existencia"
                                        required
                                        value={this.state.existencia}
                                        onChange={this.leerDato}
                                    />
                                </div>

                                <input type="submit" value="Agregar libro" className="btn btn-success" />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NuevoLibro.propTypes = {
    firestore: PropTypes.object.isRequired    
}

export default firestoreConnect()(NuevoLibro);