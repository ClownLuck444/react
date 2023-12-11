import { createRef,useState } from 'react'
import {Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';
export default function Registro() {

  const nameRef=createRef();
  const emailRef=createRef();
  const passwordRef=createRef();
  const passwordConfirmationRef=createRef();

  const[errores,setErrores] =useState([])
const {registro }=useAuth({middleware: 'guest', url:'/'})
  const handleSubmit = async e =>{
    e.preventDefault();

    const datos={
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      password_confirmation:passwordConfirmationRef.current.value,
    }
   registro(datos,setErrores)
  }
  return (
    <>
    <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
    <br></br>
    <p className="font-bold">Crea tu cuenta llenando el formulario</p>
    <div className="bg-white shadow-md rounded-md mt-1 px-5 py-4">
      <form
      onSubmit={handleSubmit}
      noValidate
      >
        {errores ?errores.map((error,i) => <Alerta key={i}>{error}</Alerta>) :null }
     <div className="mb-4"> 
          <label
          className="text-slate-800"
          htmlFor="name"
          >Nombre:</label>
          <input    
          type="text"
          id="name"
          className="mt-2 w-full p-3 bg-gray-50" 
          name="name"
          placeholder="Tu nombre"
          ref={nameRef}
          />
              </div>
              <div className="mb-4"> 
          <label
          className="text-slate-800"
          htmlFor="email"
          >Email:</label>
          <input    
          type="text"
          id="email"
          className="mt-2 w-full p-3 bg-gray-50" 
          name="email"
          placeholder="Tu correo"
          ref={emailRef}
          />
            </div>
          <div className="mb-4"> 
          <label
          className="text-slate-800"
          htmlFor="password"
          >Contraseña:</label>
          <input    
          type="password"
          id="password"
          className="mt-2 w-full p-3 bg-gray-50" 
          name="password"
          placeholder="Tu contraseña"
          ref={passwordRef}
          />
          </div>
          <div className="mb-4"> 
          <label
          className="text-slate-800"
          htmlFor="password_confirmation"
          >Repetir Contraseña:</label>
          <input    
          type="password"
          id="password_confirmation"
          className="mt-2 w-full p-3 bg-gray-50" 
          name="password_confirmation"
          placeholder="Repetir Contraseña"
          ref={passwordConfirmationRef}
          />
          </div>
          <input
          type="submit"
          value="Crear Cuenta"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3
          uppercase font-bold cursor-pointer"
          />
                </form>
              </div>
              <nav className="mt-5">
          <Link to="/auth/login">¿Ya tienes cuenta? Iniciar Sesion</Link>
              </nav>
              </>
  )
}
