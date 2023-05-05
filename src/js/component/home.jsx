import React, { useState } from "react";

//create your first component
const Home = () => {
  const [tarea, setTarea] = useState("");

  const [toDoList, settoDoList] = useState([]);

  function handleInput(event) {
    setTarea(event.target.value);
  }

  function agregarTarea() {
    if (tarea === "") {
      alert("El campo está vacío. Ingrese una tarea.")
    } else {
      settoDoList([...toDoList, tarea]);
      console.log(toDoList);
      setTarea("");
    }
  }

function deleteTarea(key) {
  console.log(key);
  settoDoList((state) => {state.splice(key, 1) 
  return [...state]});
}

  return (
    <>
      <div style={{ 
      backgroundImage: `url("https://img.freepik.com/fotos-premium/fondo-madera-blanca-vintage_1484-2259.jpg?w=2000")` 
    }} className="fondo">
      <div className="text-center">
        <h1 className="text-center pt-5">To do list!</h1>
        <div className="input-group input-group-lg">
          <input
            type="text"
            onChange={handleInput}
            value={tarea}
            placeholder="⇩ Escribe una tarea"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
          />
          
          <button type="button" onClick={agregarTarea} className="btn btn-success">
            Agregar
          </button>
        </div>
		<ul>
		{
			toDoList.length > 0 ? toDoList.map((tarea, key) => (
				<li key={key} > <button type="button" className="btn btn-light">{tarea} </button>
        <button type="button" className="btn btn-danger" onClick={() => deleteTarea(key)}>x</button>
        </li>
			)) : <button type="button" className="btn btn-warning">No hay tareas. Agrega tareas para recordarlas!</button>
		}
		</ul>
    <div>
    <h3>
      <span className="bg-light col-4 border rounded p-1">Tienes {toDoList.length} tareas por hacer</span>
    </h3>
    </div>
      </div>
      </div>
    </>
  );
};

export default Home;