import React from "react";
import logo from "../assets/img/logo.png";
import Menu from "../components/Menu";
import useUserContext from "../context/HookUserContext";
import { FaAngleDoubleDown } from "react-icons/fa";

const Home: React.FC = () => {
  const { nombre } = useUserContext();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-sky-600 px-4">
      {/* Logo container */}
      <div className="mb-8 p-4 bg-white rounded-full shadow-lg border border-amber-800 animate-pulse">
        <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
      </div>

      {/* Menú */}
      {nombre.length !== 0 ? (
        <div className="text-white text-2xl font-semibold mb-6 animate-fade-in">
          👋 Bienvenido, <span className="text-amber-300">{nombre}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 m-4 text-white text-lg">
          <p className="text-center">
            Vamos a la configuración para registrarnos
          </p>
          <FaAngleDoubleDown className="text-amber-300 animate-bounce text-2xl" />
        </div>
      )}

      <Menu />
    </div>
  );
};

export default Home;
