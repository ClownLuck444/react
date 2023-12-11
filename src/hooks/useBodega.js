import { useContext } from 'react'
import BodegaContext from '../context/BodegaProvider'

const useBodega=()=>{
    return useContext(BodegaContext)
}

export default useBodega