import { useEffect, useState } from "react";
import "./App.css";

export function App() {
  const [personaje, setPersonaje] = useState(null);
  const [id_personaje, setId_personaje] = useState(1);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id_personaje}`)
      .then((response) => response.json())
      .then((data) => setPersonaje(data));
  }, [id_personaje]); // Cuando cambie el id del personaje se renderizara el componente de nuevo

  useEffect(() => {
    if (search) {
      fetch(`https://rickandmortyapi.com/api/character/${search}`)
        .then((response) => response.json())
        .then((data) => setPersonaje(data))
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <main>
      <h1>Rick and Morty API</h1>
      {personaje ? (
        <>
          <section>
            <h2>
              {personaje.name} - {personaje.status}
            </h2>

            <img src={personaje.image} alt={personaje.name} />

            <div>
              {/* Al presionar enter en el input, que envie la peticion directamente */}
              <label htmlFor="search">Buscar personaje por ID: (1-826)</label>
              <input
                type="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                title="Buscar a personaje por su ID"
                onClick={() => {
                  setId_personaje(search);
                }}
              >
                Buscar
              </button>
            </div>
          </section>
        </>
      ) : (
        <div className="loading">Cargando personaje...</div>
      )}
    </main>
  );
}

