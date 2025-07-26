import React from "react";
import useUserContext from "../../context/HookUserContext";

const InfoDificultad: React.FC = () => {
    const {dificultad} = useUserContext();
  return (
    <div className="font-semibold gap-2 m-4 text-white text-2xl">
      {dificultad === 1 && "Dificultad: normal"}
      {dificultad === 2 && "Dificultad: Veterano"}
      {dificultad === 3 && "Dificultad: Dios"}
    </div>
  );
};

export default InfoDificultad;
