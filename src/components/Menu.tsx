import React from 'react';
import { MdOutlineSettings } from "react-icons/md";
import useUserContext from '../context/HookUserContext';
import { useNavigate } from 'react-router-dom';


const Menu:React.FC = () => {
    const {nombre, ranking} = useUserContext();
    const navigate = useNavigate();
    return (
    <div className='flex gap-4 p-4 bg-white shadow-md rounded-md items-center'>
        {nombre.length !== 0 && (
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={()=>navigate('/play')}>
          Iniciar
        </button>
      )}

      {ranking.length !== 0 && (
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition" onClick={()=> navigate('/score')}>
          Ver puntajes
        </button>
      )}

      <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition" onClick={()=>navigate('/settings')}>
        <MdOutlineSettings size={20} />
        Configuración
      </button>
    </div>
  )
}

export default Menu
