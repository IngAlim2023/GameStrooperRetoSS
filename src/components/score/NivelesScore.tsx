import React from "react";
import useUserContext from "../../context/HookUserContext";

interface Props {
  value: string;
  index: number;
}
const NivelesScore: React.FC<Props> = ({ value, index }) => {
  const { ranking } = useUserContext();
  return (
    <div
      key={index + 1}
      className="bg-white text-gray-800 p-4 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-bold text-sky-600 mb-4">Nivel: {value}</h3>
      {ranking
        .filter((a) => a.nivel === value)
        .sort((a, b) => b.puntaje - a.puntaje)
        .slice(0, 5)
        .map((value, index) => (
          <div
            key={index}
            className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg shadow-sm mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Jugador:</p>
              <p>{value.nombre}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Puntaje:</p>
              <p className="text-xl font-bold text-blue-600">{value.puntaje}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NivelesScore;
