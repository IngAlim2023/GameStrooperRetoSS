import React, { useEffect, useState } from "react";
import useUserContext from "../context/HookUserContext";
import { palabras, colores } from "../resource/game";
import { FaBackspace, FaCheck, FaPlay, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import type { ListadoPuntaje } from "../context/UserContext";

interface Palabras {
  id: number;
  palabra: string;
}
interface Colores {
  id: number;
  color: string;
}

const Game: React.FC = () => {
  const navigate = useNavigate()
  const { dificultad, ranking, setRanking, nombre } = useUserContext();
  const [palabra, setPalabra] = useState<Palabras>();
  const [color, setColor] = useState<Colores>();
  const [comenzar, setComenzar] = useState<boolean>(false);
  const [eleColor, setEleColor] = useState<number>(100);
  const [elePalabra, setElePalabra] = useState<number>(99);

  //Contador de aciertos:
  const [aciertos, setAciertos] = useState<number>(0);
  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    let timeDificultad: number = 0;
    if (dificultad === 1) {
      timeDificultad = 3000;
    } else if (dificultad === 2) {
      timeDificultad = 2000;
    } else {
      timeDificultad = 1000;
    }

    if (comenzar) {
      // Inicia el juego
      setAciertos(0);
      toast.success("Juega!!");
      intervalo = setInterval(() => {
        const alePalab = Math.floor(Math.random() * 8) + 1;
        const aleColor = Math.floor(Math.random() * 8) + 1;
        setElePalabra(alePalab);
        setEleColor(aleColor);
        setPalabra(palabras[alePalab - 1]);
        setColor(colores[aleColor - 1]);
      }, timeDificultad);

      // Detiene el juego después de 30 segundos
      timeout = setTimeout(() => {
        clearInterval(intervalo);
        setComenzar(false); // termina el juego
        toast.success("Juego finalizado");
      }, 30000);
    }

    // Limpieza del efecto si el componente se desmonta
    return () => {
      clearInterval(intervalo);
      clearTimeout(timeout);
    };
  }, [comenzar]);

  const correcto = () => {
    if (elePalabra === eleColor) {
      setAciertos(aciertos + 1);
    }
  };

  const inCorrecto = () => {
    if (elePalabra != eleColor) {
      setAciertos(aciertos + 1);
    }
  };

  //logica para el guardado de puntajes:
  const saveScore = () =>{
    if(aciertos === 0) return toast.error('No puedes guardar valores tan bajos');
    const data:ListadoPuntaje ={
      nombre,
      puntaje: aciertos
    }
    toast.success('Información guardada.')
    if (ranking.length <0) return setRanking([data])
    setRanking([...ranking, data])
    setAciertos(0)

  }

  return (
    <div className="flex justify-center items-center p-5 bg-sky-600 min-h-screen w-full">
      <div className="flex flex-col items-center">
        <div className="font-semibold gap-2 m-4 text-white text-2xl">
          {dificultad === 1 && "Dificultad: normal"}
          {dificultad === 2 && "Dificultad: Veterano"}
          {dificultad === 3 && "Dificultad: Dios"}
        </div>
        <div className={`font-extrabold text-4xl ${color?.color}`}>
          {palabra?.palabra}
        </div>
        {comenzar && (
          <div className="gap-1">
            <div
              className="inline-block mt-8 px-4 py-2 bg-red-400 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition m-1"
              onClick={() => inCorrecto()}
            >
              <div className="flex gap-1 justify-center items-center">
                <MdCancel />
                <p>Incorrecto?</p>
              </div>
            </div>
            <div
              className="inline-block mt-8 px-4 py-2 bg-green-400 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition m-1"
              onClick={() => correcto()}
            >
              <div className="flex gap-1 justify-center items-center">
                <FaCheck />
                <p>Correcto?</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center">
          {comenzar === false && (
            <div
              className="inline-block mt-8 px-4 py-2 bg-green-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition"
              onClick={() => {
                setComenzar(true);
              }}
            >
              <div className="flex gap-1 justify-center items-center">
                <FaPlay />
                <p>Comenzar</p>
              </div>
            </div>
          )}
        </div>
        {aciertos > 0 && (
          <div className=" flex flex-col mt-5">
            Tus aciertos: {aciertos}
            <div>
              <div className="inline-block mt-8 px-4 py-2 bg-lime-400 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition">
                <div className="flex gap-1 justify-center items-center" onClick={()=> saveScore()}>
                  <FaSave />
                  <p>Guardar</p>
                </div>
              </div>
              <div className="inline-block mt-8 px-4 py-2 bg-lime-400 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition ml-1">
                <div
                  className="flex gap-1 justify-center items-center"
                  onClick={() => setAciertos(0)}
                >
                  <GrPowerReset />
                  <p>Volver a intentar</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="inline-block mt-8 px-4 py-2 bg-red-700 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition ml-1">
          <div
            className="flex gap-1 justify-center items-center"
            onClick={() => navigate('/')}
          >
            <FaBackspace />
            <p>Regresar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
