import { type ReactNode, useState } from "react";
import { UserContext, type ListadoPuntaje } from "./UserContext";

export const UserProvider = ({children}:{children:ReactNode})=>{
    const [nombre, setNombre] = useState<string>('');
    const [puntaje, setPuntaje] = useState<number>(0);
    const [ranking,setRanking] = useState<ListadoPuntaje[]>([]);
    const [dificultad,setDificultad] = useState<number>(0);
    return(
        <UserContext.Provider value={{
            nombre,
            setNombre,
            puntaje,
            setPuntaje,
            ranking,
            setRanking,
            dificultad,
            setDificultad
        }}>
            {children}
        </UserContext.Provider>
    )
}