import React from "react";
import BtnRegresar from "../components/botones/BtnRegresar";
import NivelesScore from "../components/score/NivelesScore";

const Score: React.FC = () => {
  const niveles = ["Normal", "Veterano", "Dios"];
  return (
    <div className="flex flex-col justify-center items-center p-5 bg-sky-600 min-h-screen w-full text-white">
      {/* Botón regresar */}
      <BtnRegresar />

      {/* Título */}
      <h2 className="text-3xl font-bold mb-6 text-center">🏆 Puntajes</h2>

      {/* Contenedor general */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
        {/* Nivel: Normal */}
        {niveles.map((value, index) => (
          <NivelesScore value={value} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Score;
