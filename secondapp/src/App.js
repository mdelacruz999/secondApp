import React from "react";
import { nanoid } from 'nanoid'

function App() {
  //hooks
  const [nombre, setNombre] = React.useState('')
  const [apellido, setApellido] = React.useState('')
  const [id, setId] = React.useState('')
  const [lista, setLista] = React.useState([])
  const [error, setError] = React.useState(null)
  const [modoEdicion, setModoEdicion] = React.useState(false)
  //guardr datos
  const guardarDatos = (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      //alert('Ingrese el Nombre')
      setError('Ingrese el Nombre')
      return
    }
    if (!apellido.trim()) {
      //alert('Ingrese el Apellido')
      setError('Ingrese el Apellido')
      return
    }
    //console.log("registrando: "+nombre+" "+apellido)
    setLista([
      ...lista,
      { id: nanoid(4), nombre, apellido }
    ])
    //limpiar inputs
    e.target.reset()
    //limpiar los estados
    setNombre('')
    setApellido('')
    //limpiar el error
    setError(null)
  }
  //eliminar
  const eliminar = (id) => {
    const listaFiltrada = lista.filter((elemento) => elemento.id !== id)
    setLista(listaFiltrada)
  }
  //editar - prepara para editar
  const editar = (elemento) => {
    setModoEdicion(true)//activamos el modo de edicion
    setNombre(elemento.nombre)
    setApellido(elemento.apellido)
    setId(elemento.id)
  }
  //editar datos
  const editarDatos = (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      //alert('Ingrese el Nombre')
      setError('Ingrese el Nombre')
      return
    }
    if (!apellido.trim()) {
      //alert('Ingrese el Apellido')
      setError('Ingrese el Apellido')
      return
    }
    //console.log("registrando: "+nombre+" "+apellido)
    const listaEditada = lista.map(
      (elemento) => elemento.id === id ?
        { id: id, nombre: nombre, apellido: apellido } :
        elemento)
    //nueva lista
    setLista(listaEditada)
    //desactivar modo edicion
    setModoEdicion(false)
    //limpiar inputs
    e.target.reset()
    //limpiar los estados
    setNombre('')
    setApellido('')
    setId('')
    //limpiar el error
    setError(null)
  }
  return (

    <div className="container">
      <div className="row">
        <div className="col-12">
          <h4 className="text-center">
            {
              modoEdicion ? 'Edición de usuario' : 'Agregar Usuario'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarDatos : guardarDatos}>
            {
              error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : null
            }
            <input type="text"
              placeholder="Ingrese Nombre"
              className="form-control mb-3"
              onChange={(e) => {
                setNombre(e.target.value)
                if (error === 'Ingrese el Nombre') {
                  setError(null)
                }
              }}
              value={nombre}
            />
            <input type="text"
              placeholder="Ingrese Apellido"
              className="form-control mb-3"
              onChange={(e) => {
                setApellido(e.target.value)
                if (error === 'Ingrese el Apellido') {
                  setError(null)
                }
              }}
              value={apellido}
            />
            <div className="d-grid gap-2">
              {
                modoEdicion ? (<button className="btn btn-warning" type="submit">Editar</button>)
                  : (<button className="btn btn-primary" type="submit">Registrar</button>)
              }
            </div>
          </form>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
          <h4 className="text-center">Lista de Usuarios</h4>
          <ul className="list-group">
            {
              lista.map((elemento) => (
                <li key={elemento.id} className="list-group-item">
                  {elemento.nombre} {elemento.apellido}
                  <button className="btn btn-danger float-end mx-2"
                    onClick={() => eliminar(elemento.id)}>Eliminar</button>
                  <button className="btn btn-success float-end mx-2"
                    onClick={() => editar(elemento)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App;


