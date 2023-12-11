import {createContext, useState,useEffect}from 'react'
import {toast} from 'react-toastify';
import clienteAxios from '../config/axios';
const BodegaContext = createContext();

const BodegaProvider =({children})=>{
 const[categorias,setCategorias] = useState([]);
 const[categoriaActual,setCategoriasActual] = useState({})
 const[modal,setModal] = useState(false)
 const[producto,setProducto] = useState({})
 const[pedido,setPedido] = useState([])
 const[total,setTotal] = useState(0)

 useEffect(()=>{
 const nuevoTotal =pedido.reduce((total,producto) => (producto.precio * producto.cantidad) + 
 total, 0)
 setTotal(nuevoTotal)
 },[pedido])

 const ObtenerCategorias = async () =>{
    const token =localStorage.getItem('AUTH_TOKEN')
    try{
const {data} = await clienteAxios('/api/categorias',{
    headers:{
        Authorization:`Bearer ${token}`
    }
})
setCategorias(data.data)
setCategoriasActual(data.data[0])
    }catch (error){
    console.log(error)
    }
 }

 useEffect(()=>{
  ObtenerCategorias();
 },[])

 const  handleClickCategoria = id =>{
 const categoria =categorias.filter(categoria => categoria.id === id)[0]
 setCategoriasActual(categoria)
 }
const handleClickModal =()=>{
    setModal(!modal)
}
const handleSetProducto = producto => {
    setProducto(producto)
}
const handleAgregarPedido = ({categoria_id,...producto}) =>{

if(pedido.some(pedidoState => pedidoState.id === producto.id)){
    const pedidoActualizado =pedido.map(pedidoState =>pedidoState.id === producto.id ? 
        producto :pedidoState)
    setPedido(pedidoActualizado)
    toast.success('Guardado Correctamente')
}else{
    setPedido([...pedido,producto])
    toast.success('Agregado Al pedido')
}
}

const handleEditarCantidad = id=>{
const productoActualizar =pedido.filter(producto => producto.id ===id)[0]
setProducto(productoActualizar)
setModal(!modal);
}

const handleEliminarProductoPedido = id => {
    const pedidoActualizado = pedido.filter(producto => producto.id !== id)
    setPedido(pedidoActualizado)
    toast.success('Eliminado del Pedido')
}

const handleSubmitNuevaOrden =async(logout)=>{

    const token =localStorage.getItem('AUTH_TOKEN')
    try{
const {data} =await clienteAxios.post('/api/pedidos', {
 total,
 productos : pedido.map(producto =>{
    return {
        id:producto.id,
        cantidad:producto.cantidad
    }
 })
}, {
    headers:{
        Authorization:`Bearer ${token}`
    }
})
toast.success(data.message);
setTimeout(()=>{
    setPedido([])
},1000)
setTimeout(()=>{
localStorage.removeItem('AUTH_TOKEN');
},3000)
    }catch(error){
            console.log(error)
    }
}
const handleClickCompletarPedido =async id=>{
    const token =localStorage.getItem('AUTH_TOKEN')
    try {
        await clienteAxios.put(`/api/pedidos/${id}`,null,{
            headers:{
            Authorization:`Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const handleClickProductoAgotado =async id=>{
    const token =localStorage.getItem('AUTH_TOKEN')
    try {
        await clienteAxios.put(`/api/productos/${id}`,null,{
            headers:{
            Authorization:`Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}



    return(
<BodegaContext.Provider
value={{
categorias,
categoriaActual,
handleClickCategoria,
modal,
handleClickModal,
producto,
handleSetProducto,
pedido,
handleAgregarPedido,
handleEditarCantidad ,
handleEliminarProductoPedido,
total,
handleSubmitNuevaOrden,
handleClickCompletarPedido,
handleClickProductoAgotado
}}
>{children} 
</BodegaContext.Provider>
    )
}


export {
    BodegaProvider
}
export default BodegaContext


