import React from "react";
import useUserContext from "../context/HookUserContext";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
import Select from "react-select";

const Settings: React.FC = () => {
  const { setNombre, nombre, dificultad, setDificultad } = useUserContext();
  const navigate = useNavigate();
  const options = [
    { value: 1, label: "Normal" },
    { value: 2, label: "Veterano" },
    { value: 3, label: "Dios" },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Configuración de Usuario
        </h2>

        <label className="block mb-2 text-sm font-medium text-gray-600">
          Ingresa tu nombre:
        </label>
        <input
          type="text"
          placeholder="Digitar mi nombre de usuario"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          onChange={(e) => setNombre(e.target.value)}
        />

        {nombre && (
          <p className="mt-4 text-sm text-gray-600">
            Tu nombre será:{" "}
            <span className="font-medium text-blue-600">{nombre}</span>
          </p>
        )}
        <label className="block mb-2 text-sm font-medium mt-2 text-gray-600">
          Elige la dificultad:
        </label>
        <Select options={options} onChange={(e)=>setDificultad(e?.value)}/>

        {dificultad != 0 && nombre.length >= 1 && (
          <div
            className="inline-block mt-8 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition"
            onClick={() => navigate(-1)}
          >
            <div className="flex gap-1 justify-center items-center">
              <RiArrowGoBackLine />
              <p>Volver</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
