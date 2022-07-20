import { useState } from "react"
import React from 'react'
import Swal from "sweetalert2" /* -->  Instalar npm install sweetalert2, solo para tener alertas nuevas <--- */
import { v4 as uuidv4 } from "uuid";
import { useForm } from "../Hooks/useForm";


const TodoForm = ({agregarTodo}) => {

    /* --- VALORES INICIALES --- */
    const initialState ={
        titulo: '',
        descripcion: '',
        estado: 'pendiente',
        prioridad: false

    }
    const [inputs, handleChange, reset] = useForm (initialState)

   /*  --- DESESTRUCTURACIÓN --- */
    const {titulo, descripcion, estado, prioridad} = inputs;

    const handleSubmit = (e) =>{
        e.preventDefault()

        /* -> para validar que no deje en blanco <- */
        if(!titulo.trim()){
            e.target[0].focus(); /* -> para indique campo selecionado */
             Swal.fire({
                title: "Error!",
                text: "¡No deje el Titulo en Blanco!",
                icon: "error"
             })
            return;
        }
        if(!descripcion.trim()){
            e.target[1].focus(); /* -> para indique campo selecionado */
            Swal.fire({
               title: "Error!",
               text: "¡No deje la Descripción en Blanco!",
               icon: "error"   
            });
            return;
        }
        agregarTodo({
            titulo,
            descripcion,
            estado: estado === 'pendiente' ? false : true,
            prioridad,
            id: uuidv4()
           })
        reset(); /* --> reinicia los campos */ 
    };

  return (
    <>      
        {/* ---TODO USANDO CON BOOTSTRAPS--- */}
        <div className="row">
            
            <div className="col-sm-4 "></div>
            <div className="col-sm-4 py-5">
                <h2>TODO LIST</h2>

                <form onSubmit={handleSubmit}>
                    {/* ----- TITULO DE LA TAREA ---- */}
                    <input 
                    type = 'text'
                    name="titulo"
                    className ='form-control mb-2'
                    placeholder ='Ingrese Titulo'
                    value ={titulo} /* --> para esto sirve la DESESTRUCTURACIÓN */
                    onChange ={handleChange}
                    />

                    {/* ---- DESCRIPCION DE LA TAREA ---- */}
                    <textarea
                        className="form-control mb-2"
                        placeholder = "Ingrese Descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={handleChange}
                    />
                    <select 
                    name="estado" 
                    className='form-control mb-2'
                    value={estado}
                    onChange={handleChange}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="completado">Completado</option>
                    </select>

                    {/* ---CHECKBOX PRIORIDAD---- */}
                    <div className="form-check">
                        <input 
                        className="form-check-input" 
                        type="checkbox"
                        name='prioridad' 
                        checked={prioridad}
                        id="flexCheckDefault"
                        onChange={handleChange}
                        />

                        <label 
                        className="form-check-label" 
                        htmlFor="flexCheckDefault"
                        >
                            Prioritario
                        </label>
                    </div>

                    {/* ---BOTON AGREGAR--- */}
                    <div className="d-grid gap-2 col mx-auto">
                        <button 
                        type='submit' 
                        className='btn btn-dark fw-bold'                     
                        >
                            AGREGAR
                        </button>
                    </div>

                </form>            
            </div>
        </div>
    </>

  )
}

export default TodoForm