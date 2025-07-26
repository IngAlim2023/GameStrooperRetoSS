import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBackspace } from "react-icons/fa";


const BtnRegresar:React.FC = () => {
  const navigate = useNavigate();
    return (
    <div className="inline-block mt-8 px-4 py-2 bg-red-700 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition ml-1">
          <div
            className="flex gap-1 justify-center items-center"
            onClick={() => navigate("/")}
          >
            <FaBackspace />
            <p>Regresar</p>
          </div>
        </div>
  )
}

export default BtnRegresar
