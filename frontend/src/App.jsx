import FormularioProfesional from "./Formularioprofesional";
import { Listadeprofesionales } from "./Listadeprofesionales";
import Reservarturnos from "./Reservarturnos";

function App() {
  return(
    <div className="w-screen flex justify-center">
      <Listadeprofesionales />
      {/* <FormularioProfesional /> */}
      {/* <Reservarturnos /> */}
    </div>
  )
}  

export default App;
