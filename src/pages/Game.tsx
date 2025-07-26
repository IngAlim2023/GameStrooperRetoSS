import React, { useEffect, useState } from "react";
import useUserContext from "../context/HookUserContext";
import {
  palabras,
  colores,
  type Palabras,
  type Colores,
} from "../resource/game";
import { FaCheck, FaPlay, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import type { ListadoPuntaje } from "../context/UserContext";
import InfoDificultad from "../components/game/InfoDificultad";
import BtnRegresar from "../components/botones/BtnRegresar";

const Game: React.FC = () => {
  const { dificultad, ranking, setRanking, nombre } = useUserContext();
  const [palabra, setPalabra] = useState<Palabras>();
  const [color, setColor] = useState<Colores>();
  const [comenzar, setComenzar] = useState<boolean>(false);
  const [eleColor, setEleColor] = useState<number>(100);
  const [elePalabra, setElePalabra] = useState<number>(99);
  //conteo de palabara:
  const [conteo, setConteo] = useState<number>(0);

  //Contador de aciertos:
  const [aciertos, setAciertos] = useState<number>(0);
  const [errores, setErrore] = useState<number>(0);

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
      setConteo(0);
      toast.success("Juega!!");
      intervalo = setInterval(() => {
        // Seccion para la aleatoriedad de las palabras con los colores
        const alePalab = Math.floor(Math.random() * 8) + 1;
        const aleColor = Math.floor(Math.random() * 8) + 1;
        setElePalabra(alePalab);
        setEleColor(aleColor);
        setPalabra(palabras[alePalab - 1]);
        setColor(colores[aleColor - 1]);

        setConteo((prev) => prev + 1);
      }, timeDificultad);

      // Detiene el juego después de 30 segundos
      timeout = setTimeout(() => {
        clearInterval(intervalo);
        setComenzar(false); // termina el juego
        toast.success("Juego finalizado");
      }, 31000);
    }

    // Limpieza del efecto si el componente se desmonta
    return () => {
      clearInterval(intervalo);
      clearTimeout(timeout);
    };
  }, [comenzar]);

  const correcto = () => {
    if (elePalabra === eleColor) {
      if (conteo <= aciertos) return;
      return setAciertos(aciertos + 1);
    }
    setErrore((prev) => prev + 1);
  };

  const inCorrecto = () => {
    if (elePalabra != eleColor) {
      if (conteo <= aciertos) return;
      return setAciertos(aciertos + 1);
    }
    setErrore((prev) => prev + 1);
  };

  //logica para el guardado de puntajes:
  const saveScore = () => {
    if (aciertos === 0)
      return toast.error("No puedes guardar valores tan bajos");
    const porc =((aciertos / (aciertos+errores)) * 100).toFixed(1);
    const data: ListadoPuntaje = {
      nombre,
      puntaje: aciertos,
      nivel:
        dificultad === 1 ? "Normal" : dificultad === 2 ? "Veterano" : "Dios",
      errores,
      porcentaje: parseFloat(porc),
      };
    toast.success("Información guardada.");
    if (ranking.length < 0) return setRanking([data]);
    setRanking([...ranking, data]);
    setAciertos(0);
    setConteo(0);
  };

  return (
    <div className="flex justify-center items-center p-5 bg-sky-600 min-h-screen w-full">
      <div className="flex flex-col items-center">
        <InfoDificultad />
        <div className="flex items-center">
          {comenzar === false && (
            <div
              className="inline-block mt-8 px-4 py-2 bg-green-200 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition"
              onClick={() => {
                setComenzar(true);
                setConteo(30);
              }}
            >
              <div className="flex gap-1 justify-center items-center">
                <FaPlay />
                <p>Comenzar</p>
              </div>
            </div>
          )}
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
        <div className="flex flex-col justify-center items-center bg-white m-4 p-4 rounded-xl border-2 border-dashed border-sky-400 shadow-md w-full max-w-sm text-gray-800">
          <h2 className="text-2xl font-bold text-sky-600 mb-3">📊 Dashboard</h2>

          <div className="space-y-2 w-full">
            <div className="flex justify-between">
              <span className="font-semibold">✅ Tus aciertos:</span>
              <span>{aciertos}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">🚫 Errores:</span>
              <span>{errores}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">🔤 Palabras totales:</span>
              <span>{conteo}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">🎯 Porcentaje correctas:</span>
              <span>
                {conteo === 0
                  ? "0%"
                  : `${((aciertos / (aciertos+errores)) * 100).toFixed(1)}%`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">⏳ Tiempo restante:</span>
              {dificultad === 1 && (
                <div>
                  <span>{(30 - conteo * 3)+1}s</span>
                </div>
              )}
              {dificultad === 2 && (
                <div>
                  <span>{(30 - conteo * 2)+1}s</span>
                </div>
              )}
              {dificultad === 3 && (
                <div>
                  <span>{(30 - conteo)+1}s</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {aciertos > 0 && (
          <div className=" flex flex-col mt-5">
            <div>
              <div className="inline-block mt-8 px-4 py-2 bg-lime-400 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition">
                <div
                  className="flex gap-1 justify-center items-center"
                  onClick={() => saveScore()}
                >
                  <FaSave />
                  <p>Guardar</p>
                </div>
              </div>
              <div className="inline-block mt-8 px-4 py-2 bg-red-400 text-gray-700 rounded-md hover:bg-gray-300 cursor-pointer transition ml-1">
                <div
                  className="flex gap-1 justify-center items-center"
                  onClick={() => {
                    setAciertos(0);
                    setConteo(0);
                  }}
                >
                  <GrPowerReset />
                  <p>Volver a intentar</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <BtnRegresar />
      </div>
    </div>
  );
};

export default Game;
