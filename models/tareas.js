import { Tarea } from "./tarea.js";
//import { Tarea } from './models/tarea.js';

class Tareas {
    _listado = {};

    get listadoArr() { //es como si tuvieramos una propiedad en la clase( retorna un nuevo arreglo )
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]; //extrae la tarea 
            listado.push(tarea); //agrega al listado 
        });
        return listado; //retorna
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {

        let contador = 0;
        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            if (completadas) {
                //Muestra tareas completadas

                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${desc} :: ${estado}`);
                }
            } else {
                //Muestra las tareas pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green} ${desc} :: ${estado}`);
                }
            }
        });

    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(Tarea => {
            if ( !ids.includes(Tarea.id)){
                this._listado[Tarea.id].completadoEn = null
            }
        })
    }
}


export { Tareas };