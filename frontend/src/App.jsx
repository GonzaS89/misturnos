import { Formularioturno } from "./Formularioturno";
import { Formularioturno2 } from "./Formularioturno2";
import { Listadeprofesionales } from "./Listadeprofesionales";
import { Turnos } from "./Turnos";
import { Header } from "./Header";
import { ContenedorMain } from "./ContenedorMain";


function App() {
  return(
    <div className="flex justify-center w-screen">
    <Header />
    {/* <ContenedorMain /> */}
    <Listadeprofesionales />
  
    {/* <Formularioturno /> */}
      {/* <Formularioturno2 /> */}
    {/* <Turnos /> */}
    </div>
  )
}  

export default App;
