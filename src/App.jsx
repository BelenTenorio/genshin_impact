import { useEffect } from "react";
import {useState} from "react";

const tipos = {
  artifacts: "Artefactos",
  boss: "Jefes",
  characters: "Personajes",
  consumables: "Consumibles",
  domains: "Demonios",
  elements: "Elementos",
  enemies: "Enemigos",
  materials: "Materiales",
  nations: "Naciones",
  weapons: "Armas",
}

function App() {
  const [genshinState,setGenshinState] = useState({
    types: [],
  });
  
  const fetchGenshinApi = async (item, url = "https://api.genshin.dev/") => {
    const respuesta = await  fetch(url);
    const respJson = await respuesta.json();
    if (item === "types"){
      setGenshinState({
        ...genshinState,
        types: respJson.types,
      });
    } else{
        setGenshinState ({types:[...genshinState.types],[item]: respJson});
    }
    console.log(genshinState);
  };

  useEffect(() =>{
    fetchGenshinApi("types");
  }, []);

  const handleChangeType = ({target}) => {
    const url = `https://api.genshin.dev/${target.value}`;
    fetchGenshinApi(target.value, url);
  };

  return (
    <div className="App container">
      <h1>Genshic Impact</h1>
      <select name="types" onChange={handleChangeType}>
        <option value="">Seleccione una opcion</option>      
        {genshinState.types.map((type) => (
          <option key={type} value={type}>
            {tipos[type]}</option>
        ))}
      </select>

          {genshinState.artifacts && (
            <select name="artifacts">
              <option value="">Seleccione un set de artefactos</option>
              {genshinState.artifacts.map((artifacts) => (
                <option key={artifacts} value={artifacts}>
                  {artifacts}
                </option>
              ))}

            </select>
          )}

    </div>
  );
}

export default App;
