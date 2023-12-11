import useBodega from "../hooks/useBodega"
export default function Categoria({categoria}) {
    const{handleClickCategoria,categoriaActual}=useBodega();
    const {icono,id,nombre}=categoria
  return (
    <div className={`${categoriaActual.id === id ? "bg-amber-400":'bg-white'} 
    flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
        <img
        alt="imagenicono"   
        src={`/img/icono_${icono}.svg`}s
        className="w-12"    
        />
        <button className="text-lg font-bold cursor-pointer truncate"
        type="button"
        onClick={()=>handleClickCategoria(id)}
        >
            {nombre}
            </button>
    </div>
  )
}
