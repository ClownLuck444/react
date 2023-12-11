import useBodega from "../hooks/useBodega"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth"


export default function Sidebar() {
    const {categorias}=useBodega()
    const {logout,user} =useAuth({middleware: 'auth'})
  return (
    <aside className="md:w-72">
        <div className="p-4">
            <img
             className="w-40"
             src="../img/LOGO.jpg"
             alt="imagenlogo"
            />
            </div>
            <p className="my-10 text-xl text-center font-bold">Hola: {user?.name}</p>

        <div className="mt-3">
            {categorias.map(categoria=>(
                <Categoria
            key={categoria.id}
                categoria={categoria}
                />
            ))}
        </div>
        <div className="my-5 px-5">
            <button type="button"
            className="text-center bg-red-500 w-full p-3 font-bold text-white
            truncate hover:bg-black"
            onClick={logout}
            >
                Cancelar Orden
            </button>
        </div>
            </aside>
  )
}
