import React from "react";
import useUserContext from "../context/HookUserContext";
import { useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";

const Score: React.FC = () => {
  const { ranking } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center p-5 bg-sky-600 min-h-screen w-full text-white">
      <div className="inline-block mt-8 px-4 py-2 bg-red-700 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition m-1">
        <div
          className="flex gap-1 justify-center items-center"
          onClick={() => navigate("/")}
        >
          <FaBackspace />
          <p>Regresar</p>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-6">🏆 Puntajes</h2>
      <div className="w-full max-w-md space-y-4">
        {ranking.length === 0 ? (
          <p className="text-center text-lg">
            No hay puntajes registrados aún.
          </p>
        ) : (
          ranking.map((value, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 px-4 py-3 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Jugador:</p>
                <p>{value.nombre}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Puntaje:</p>
                <p className="text-xl font-bold text-blue-600">
                  {value.puntaje}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Score;
