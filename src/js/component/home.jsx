import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const [tarea, setTarea] = useState("");
  const [toDoList, setToDoList] = useState([]);

 const actualizarTarea = () => {
  fetch('https://assets.breatheco.de/apis/fake/todos/user/ToDoAlex200', {
    method: "PUT",
    body: JSON.stringify(toDoList),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(resp => {
      console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
      console.log(resp.status); // el código de estado = 200 o código = 400 etc.
      console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
      return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
  })
  .then(data => {
      //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
      console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
  })
  .catch(error => {
      //manejo de errores
      console.log(error);
  });

  }

        // this was the function to receive the data from onChange at input
  // function handleInput(event) {
  //   setTarea(event.target.value);
  // }

  function agregarTarea() {
    if (tarea === "") {
      alert("El campo está vacío. Ingrese una tarea.")
    } else {                   // { label: "Make the bed", done: false }
      setToDoList([...toDoList, {label:tarea, done:false}]);
      console.log(toDoList);
      setTarea("");
    }
  }

  function deleteTarea(key) {
    console.log(key);
    setToDoList((state) => {
      state.splice(key, 1)
      return [...state]
    });
  }

  function obtenerToDoList() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/ToDoAlex200')
      // Exito
      .then(response => response.json())  // convertir a json
      .then(json => setToDoList(json))    //imprimir los datos en la consola
      .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
  }
  useEffect(() => {
    // Solicitud GET (Request).
    obtenerToDoList()
  }, []
);

// 2. estoy vigilando un estado de cambia para ejecutar el bloque de codigo dentro la funcion
	 useEffect(()=>{
	 	 //bloque de codigo a ejecutar
 	 	actualizarTarea()
	},[toDoList])

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
              // onChange={handleInput}
              // 
              onChange={(event) => setTarea(event.target.value) }
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
              toDoList.length > 0 ? toDoList.map((toDo, key) => (
                <li key={key} > <button type="button" className="btn btn-light">{toDo.label} </button>
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